import express from 'express'
import { getJoin, postJoin, login } from '../controllers/userController'
import { home, search, codeDeploy } from '../controllers/videoController'

const rootRouter = express.Router()

rootRouter.get("/", home)
rootRouter.get("/codeDeploy", codeDeploy)
rootRouter.route("/join").get(getJoin).post(postJoin)
rootRouter.get("/login", login)
rootRouter.get("/search", search)


export default rootRouter