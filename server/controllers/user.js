import {createError} from "../error.js";
import User from "../models/User.js"
import Video from "../models/Video.js"

export const update  = async (req , res  , next ) =>{

  console.log(req.params.id)
  console.log(req.user.id)
if( req.params.id === req.user.id ){

try{
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id ,
    {
    $set : req.body
  },
  {
    new : true
  }
)
  res.status(200).json(updatedUser)
}catch(err)
{
  next(err);
}


}else{
return next(createError(403 , " you can only update your account"));
}

}

export const deleteUser  = async (req , res  , next ) =>{
  console.log(req.params.id)
  console.log(req.user.id)
if( req.params.id === req.user.id ){

try{
  await User.findByIdAndDelete(
    req.params.id ,
)
  res.status(200).json("User has been deleted")
}catch(err)
{
  next(err);
}


}else{
return next(createError(403 , " you can only delete your account"));
}
}

export const getUser  = async(req , res  , next ) =>{
try{
  const user = await User.findById(req.params.id);
  res.status(200).json(user);
}catch(err)
{
  next(err);
}
}

export const subscribe  = async (req , res  , next ) =>{
  try{
    await User.findByIdAndUpdate(req.user.id, {
      $push: {subscribedUsers: req.params.id}
    })
    await User.findByIdAndUpdate(req.params.id , {
      $inc: { subscribers: 1},
    });
    res.status(200).json("subscription Successful");
  }catch(err)
  {
    next(err);
  }
}

export const unsubscribe  = async (req , res  , next ) =>{
  try{
       await User.findByIdAndUpdate(req.params.id, {
         $pull: {subscribedUsers: req.params.id}
       })
       await User.findByIdAndUpdate(req.params.id , {
         $inc: { subscribers: -1},
       });
       res.status(200).json("unsubscription Successful");

  }catch(err)
  {
    next(err);
  }
}

export const like  = async (req , res  , next ) =>{
  const id = req.user.id;
  const videoId = req.params.videoId ;
  try{
await Video.findByIdAndUpdate(videoId, {
  $addToSet:{likes:id},
  $pull:{dislikes:id}
})
res.status(200).json("the video has been liked")

  }catch(err)
  {
    next(err);
  }
}

export const dislike  = async (req , res  , next ) =>{
  const id = req.user.id;
  const videoId = req.params.videoId ;
  try{
  await Video.findByIdAndUpdate(videoId, {
  $addToSet:{dislikes:id},
  $pull:{likes:id}
  })
  res.status(200).json("the video has been disliked")

  }catch(err)
  {
    next(err);
  }
}
