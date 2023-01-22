import express from 'express'
import {edit,logout,see,startGithubLogin,finishGithubLogin, getEdit, postEdit, getChangePassword, postChangePassword} from '../controllers/userController'
import {protectedMiddleware,pubicOnlyMiddleware, uploadAvatar} from '../src/middleware'

const userRouter = express.Router()

 
userRouter
    .get("/logout", protectedMiddleware, logout)
userRouter.route('/edit')
    .all(protectedMiddleware)
    .get(getEdit)
    .post(uploadAvatar.single('avatar'), postEdit) 
    // avatar = field name(input name in pug), save the images into the uploads directory
userRouter
    .route('/change-password')
    .all(protectedMiddleware)
    .get(getChangePassword)
    .post(postChangePassword)
userRouter
    .get("/github/start",pubicOnlyMiddleware, startGithubLogin)
userRouter
    .get("/github/finish",pubicOnlyMiddleware, finishGithubLogin)
userRouter
    .get("/:id", see)



export default userRouter