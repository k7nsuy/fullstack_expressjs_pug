import express from 'express'
import {edit,remove,logout,see,startGihubLogin,finishGithubLogin} from '../controllers/userController'

const userRouter = express.Router()


userRouter.get("/logout", logout)
userRouter.get("/edit", edit)
userRouter.get("/remove", remove)
userRouter.get("/github/start", startGihubLogin)
userRouter.get("/github/finish", finishGithubLogin)
userRouter.get("/:id(\\d+)", see)



export default userRouter