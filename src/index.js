import express from "express";
import morgan from "morgan" // morgan을 통해서 middleware을 만들 필요 없이 5가지 버전으로
// http log에 대한 정보를 app.use를 통해 middleware 형식으로 제공
import globalRouter from "../routers/globalRouter";
import userRouter from "../routers/userRouter";
import videoRouter from "../routers/videoRouter";

const app = express() 
const port = 3001
const logger = morgan("dev") // dev,combined,common,short,tiny (morgan - 5가지 데이터 형식)
// 필요한 상황에 따라 사용

app.set("view engine", "pug") // set view engine
app.set("views", process.cwd() + "/src/views") // src 안에 views로 current directory 지정

app.use("/", globalRouter)
app.use("/users", userRouter)
app.use("/videos", videoRouter)

app.use(logger)




// app.get('/', handleHome)
// app.get('/videos', handleWatchVideo)
// app.get('/users', handleEitUser)




// const logger = (req,res,next) => { // middleware (middle soft ware)
//     console.log(`${req.method},${req.url}`);
//     next()
// }




// const privateMiddleware = (req,res,next) => { //privateMiddleware => middleware (middle soft ware)
//     const url = req.url
//     if(url === "/protected") {
//         return res.send("<h1>Not Allowed</h1>")
//     }
//     next()
// }

// app.use(privateMiddleware)

// const handleProtected = (req,res) => {
//     return res.send(`Welcome to the private lounge`) 
// }

// app.get('/protected',handleProtected)

 
const handleListening = () => console.log(`✅ Server listening on port ${port} 🚀`);
app.listen(port, handleListening) // handleListening => callback function
 