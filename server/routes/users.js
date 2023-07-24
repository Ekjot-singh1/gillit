import express from "express"
import { update , deleteUser , getUser , subscribe , unsubscribe , like , dislike} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//update user
router.put("/:id",verifyToken,update)

// delete userRoutes
router.delete("/find/:id",verifyToken,deleteUser)

// get a userRoutes
router.get("/find/:id",getUser)

// subscribe a userRoutes
router.put("/sub/:id",verifyToken,subscribe)

// unsubscribe a userRoutes
router.put("/unsub/:id",verifyToken, unsubscribe)

// like a videos
router.put("/like/:videoId",verifyToken,like)

// dislike a videos
router.put("/dislike/:videoId",verifyToken,dislike)

export default router ;
