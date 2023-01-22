import express from 'express'
import {edit,logout,see,startGithubLogin,finishGithubLogin, getEdit, postEdit, getChangePassword, postChangePassword} from '../controllers/userController'
import {protectedMiddleware,pubicOnlyMiddleware} from '../src/middleware'

const userRouter = express.Router()

 
userRouter.get("/logout", protectedMiddleware, logout)
userRouter.route('/edit').all(protectedMiddleware).get(getEdit).post(postEdit)
userRouter.route('/change-password').all(protectedMiddleware).get(getChangePassword).post(postChangePassword)
userRouter.get("/github/start",pubicOnlyMiddleware, startGithubLogin)
userRouter.get("/github/finish",pubicOnlyMiddleware, finishGithubLogin)
userRouter.get("/:id(\\d+)", see)



export default userRouter