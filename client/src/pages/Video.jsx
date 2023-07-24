import React from 'react'
import styled from 'styled-components'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import SendIcon from '@mui/icons-material/Send';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Comments from '../components/Comments';
import Card from "../components/Card"
import { useDispatch } from "react-redux"
import {useSelector} from 'react-redux'
import { useLocation } from "react-router-dom";
import axios from "axios";
import { format} from 'timeago.js';
import { useState , useEffect } from "react";
import {fetchStart , fetchSuccess , fetchFailure , like , dislike } from "../redux/videoSlice"
import { subscription} from "../redux/userSlice"
import FaceIcon from '@mui/icons-material/Face';
import ThumbUpOffAltTwoToneIcon from '@mui/icons-material/ThumbUpOffAltTwoTone';
  import ThumbDownOffAltTwoToneIcon from '@mui/icons-material/ThumbDownOffAltTwoTone';
import Recommendation from "../components/Recommendation";


const Container = styled.div`
display: flex;
gap: 24px;
`

const Content = styled.div`
flex:5 ;
`


const VideoWrapper = styled.div`

`

const Title = styled.h1`
font-size: 18px;
font-width: 400px;
margin-top:20px;
margin-bottom:10px;
color: ${({theme}) => theme.text}
`

const Details = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`

const Info = styled.div`

color: ${({theme}) => theme.textSoft}
`

const Buttons = styled.div`
display: flex;
gap: 20px;
color: ${({theme}) => theme.text}
`

const Button = styled.div`
display:flex;
align-items: center;
gap: 5px;
cursor: pointer;
`


const Hr = styled.hr`
margin: 15px 0px;
border: 0.5px solid ${({theme}) => theme.soft}
`

const Channel = styled.div`
display: flex ;
justify-content:"space-between"
`

const ChannelInfo = styled.div`
display: flex ;
gap:20px;
`
const Image = styled.img`
width:50px;
height:50px;
border-radius:50%;
`
const ChannelDetail = styled.div`
display: flex;
flex-direction: column;
color: ${({ theme }) => theme.text}


`
const ChannelName = styled.span`
font-weight: 500;

`
const ChannelCounter = styled.span`
margin-top:5px;
margin-bottom: 20px;
color: ${({theme}) => theme.textSoft};
font-size: 12px;
`
const Description = styled.p`
font-size:14px;
`

const Subscribe = styled.button`
background-color: #cc1a00;
font-weight: 500;
color:  white;
border: none;
border-radius:3px;
height: max-content;
padding: 10px 20px;
cursor: pointer;

`

const VideoFrame = styled.video`
max-height: 720px;
width: 100%;
object-fit: cover;
`


const Video = () => {

  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
// console.log(useSelector((state) => state));

const path = useLocation().pathname.split("/")[2]

// console.log(path);
const [channel, setChannel] =  useState({})

useEffect(()=>{

  const fetchData = async() =>{
    try{
      const videoRes = await axios.get(`/videos/find/${path}`)
        const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`)

       // console.log(videoRes)
        setChannel(channelRes.data)
        dispatch(fetchSuccess(videoRes.data))
    }catch(err)
    {
dispatch(fetchFailure())
    }
  }
  fetchData()
},[path,dispatch])

const [isLiked, setIsLiked] = useState(currentVideo?.likes?.includes(currentUser?.id));
const [isDisliked, setIsDisliked] = useState(currentVideo?.dislikes?.includes(currentUser?.id));

const handleLike = async () => {
  // Check if the video is already liked by the current user

    await axios.put(`/users/like/${currentVideo?._id}`);
  dispatch(like(currentUser._id))
};


const handleDislike = async () => {

    await axios.put(`/users/dislike/${currentVideo?._id}`);
    dispatch(dislike(currentUser._id))
};


const handleSub = async() => {

  currentUser.subscribedUsers.includes(channel._id)  ?
   await axios.put(`/users/unsub/${channel._id}`):
    await axios.put(`/users/sub/${channel._id}`)
  dispatch(subscription(channel._id))
}


console.log(currentUser.subscribedUsers)

  return (
    <Container>
     <Content>
      <VideoWrapper>
    <VideoFrame src = {currentVideo.videoUrl} controls />
      </VideoWrapper>
    <Title> {currentVideo?.title} </Title>
      <Details>
<Info> {currentVideo.views} views •  {format(currentVideo?.createdAt)} </Info>
        <Buttons>
        <Button onClick={handleLike}>
      {currentVideo?.likes?.includes(currentUser?._id) ? (<ThumbUpOffAltTwoToneIcon/>) : (<ThumbUpOffAltIcon /> )}
      {" "}
      {currentVideo?.likes?.length}
    </Button>
          <Button onClick = {handleDislike}>
          {currentVideo?.dislikes?.includes(currentUser?._id) ? (<ThumbDownOffAltTwoToneIcon/>) : (<ThumbDownOffAltIcon /> )}
          {" "}
          {currentVideo?.dislikes?.length}

          </Button>
          <Button> <SendIcon/>Share</Button>
          <Button> <BookmarkBorderIcon/>Save</Button>
        </Buttons>
      </Details>
      <Hr/>

      <Channel>
        <ChannelInfo>
          <Image src = {channel.img}/>
        <ChannelDetail>
          <ChannelName>
          {channel.name}
          </ChannelName>
          <ChannelCounter>
            {channel.subscribers} subscribers
          </ChannelCounter>

          <Description>
          {currentVideo?.desc}
          </Description>
        </ChannelDetail>
        </ChannelInfo>
        <Subscribe onClick = {handleSub}>
        {currentUser.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}
        </Subscribe>
      </Channel>

      <Hr/>
      <Comments videoId = {currentVideo._id}/>
      </Content>
 <Recommendation tags={currentVideo.tags} />
    </Container>
  )
}

export default Video
