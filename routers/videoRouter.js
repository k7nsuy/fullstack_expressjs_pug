import express from 'express'
import {watch,edit,see,remove} from '../controllers/videoController'

const videoRouter = express.Router()

videoRouter.get("/watch", watch)
videoRouter.get("/:id(\\d+)", see)
videoRouter.get("/:id(\\d+)/edit", edit)
videoRouter.get("/:id(\\d+)/delete", remove)

export default videoRouter