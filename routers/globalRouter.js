import express from 'express'
import { join,login,search } from '../controllers/globalController'
import { trending } from '../controllers/videoController'
const globalRouter = express.Router()

globalRouter.get("/", trending)
globalRouter.get("/join", join)
globalRouter.get("/login", login)
globalRouter.get("/search", search)



export default globalRouter