
import React from 'react'
import styled from "styled-components"
import Gillit from "../img/logo.png"
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SettingsIcon from '@mui/icons-material/Settings';
import ReportIcon from '@mui/icons-material/Report';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'

const Container = styled.div`
flex:1.2;
background-color: ${({theme}) => theme.bgLighter};
height: 100vh;
color: ${({theme}) => theme.text};
font-size:14px;
position: sticky;
top:0;
`

const Wrapper = styled.div`
padding: 18px 26px;`

const Logo = styled.div`
display:flex;
align-items: center;
gap: 5px;
font-weight: bold;
margin-bottom:25px;
`

const Img =  styled.img`
height:25px;

`

const Item = styled.div`
display:flex;
align-items:center;
gap:20px;
cursor:pointer;
padding: 4.7px 0px;

&:hover{
  background-color: ${({theme}) => theme.soft};
}
`

const Hr = styled.hr`
margin:15px 0px;
border: 0.5px solid ${({theme}) => theme.soft};
`

const Login = styled.div`

`

const Button = styled.button`
padding: 5px 15px;
background-color: transparent;
border: 1px solid #3ea6ff;
color: #3ea6ff;
border-radius: 3px;
font-weight:500;
margin-top:10px;
cursor:pointer;
display: flex;
align-items: center;
gap:5px;
`


const Title = styled.h2`
font-size: 14px;
font-weight: 500;
color: #aaaaaa;
margin-bottom: 20px;
`

const Menu = ({darkMode , setDarkMode}) => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Container>
   <Wrapper>
    <Link to = "/" style = {{textDecoration: "none" , color: "inherit"}}>
   <Logo>
    <Img src= {Gillit}/>
    Gillit
   </Logo>
   </Link>
   <Item>
    <HomeIcon/>
    Home
   </Item>
<Link to = "trends" style = {{textDecoration:"none" ,color : "inherit"}}>
   <Item>
    <ExploreIcon/>
    Explore
   </Item>
</Link>

<Link to = "subscriptions" style = {{textDecoration:"none" ,color : "inherit"}}>
   <Item>
    <SubscriptionsIcon/>
    Subscriptions
   </Item>
</Link>
   <Hr/>

   <Item>
    <VideoLibraryIcon/>
   Library
   </Item>

   <Item>
    <HistoryIcon/>
    History
   </Item>

   <Hr/>
{
  !currentUser &&
  <>
   <Login>
    Sign in to like videos, comment, and subscribe
   <Link to = "signin" style = {{textDecoration:"none"}}>


    <Button><PersonOutlineIcon/>SIGN IN</Button>

    </Link>
   </Login>

   <Hr/>

   </>
}
<Title>
  BEST OF GILLIT
</Title>
   <Item>
    <MusicVideoIcon/>
    Music
   </Item>

   <Item>
    <SportsSoccerIcon/>
    Sports
   </Item>

   <Item>
    <SportsEsportsIcon/>
    Gaming
   </Item>

   <Item>
    <MovieFilterIcon/>
    Movies
   </Item>

   <Item>
    <NewspaperIcon/>
    News
   </Item>

   <Item>
    <LiveTvIcon/>
    Live
   </Item>
   <Hr/>
   <Item>
    <SettingsIcon/>
    Settings
   </Item>

   <Item>
    <ReportIcon/>
    Report
   </Item>

   <Item>
    <HelpOutlineIcon/>
    Help
   </Item>

    <Item onClick = {()=> setDarkMode(!darkMode)}>
    <SettingsBrightnessIcon/>
    {darkMode ? "Light" : "Dark"} Mode
   </Item>


   </Wrapper>
    </Container>
  )
}

export default Menu
