import express from "express";
import morgan from "morgan" // morgan을 통해서 middleware을 만들 필요 없이 5가지 버전으로
// http log에 대한 정보를 app.use를 통해 middleware 형식으로 제공
import session from "express-session"; 
import rootRouter from "../routers/rootRouter";
import userRouter from "../routers/userRouter";
import videoRouter from "../routers/videoRouter";
import { localsMiddleware } from "./middleware";
import MongoStore from "connect-mongo";

const app = express() 

const logger = morgan("dev") // dev,combined,common,short,tiny (morgan - 5가지 데이터 형식)
app.use(logger);
// 필요한 상황에 따라 사용

app.set("view engine", "pug") // set view engine
app.set("views", process.cwd() + "/src/views") // src 안에 views로 current directory 지정

app.use(express.urlencoded({ extended: true })) // express가 form의 value들을 이해하고 // 자바스크립트 형식으로 변경 해 준다.

app.use(
    session({ // The session is using before other routers that connect with servers
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 20000,
        },
        store: MongoStore.create({mongoUrl: process.env.DB_URL})
    })
)

app.use(localsMiddleware)
app.use('/uploads', express.static("uploads"))
app.use("/", rootRouter)
app.use("/users", userRouter)
app.use("/videos", videoRouter)

export default app
