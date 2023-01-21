import express from 'express'
import {getEdit,postEdit,watch,getUpload,postUpload, deleteVideo} from '../controllers/videoController'
import { protectedMiddleware } from '../src/middleware'

const videoRouter = express.Router()

videoRouter.get("/:id([0-9a-f]{24})", watch)
videoRouter
    .route("/:id([0-9a-f]{24})/edit")
    .all(protectedMiddleware)
    .get(getEdit)
    .post(postEdit)
videoRouter
    .route("/:id([0-9a-f]{24})/delete")
    .all(protectedMiddleware)
    .get(deleteVideo)
videoRouter
    .route("/upload")
    .all(protectedMiddleware)
    .get(getUpload)
    .post(postUpload)

export default videoRouter