import express from "express";

const app = express() 
const port = 3000

const handleHome = (req,res) => { // controller
    console.log(`hihi`);
    return res.send(`I still love you`)
}

const handleProtected = (req,res) => {
    return res.send(`Welcome to the private lounge`) 
}

const logger = (req,res,next) => { // middleware (middle soft ware)
    console.log(`${req.method},${req.url}`);
    next()
}

const privateMiddleware = (req,res,next) => { //privateMiddleware => middleware (middle soft ware)
    const url = req.url
    if(url === "/protected") {
        return res.send("<h1>Not Allowed</h1>")
    }
    next()
}

app.use(logger)
app.use(privateMiddleware)
app.get('/', handleHome)
app.get('/protected',handleProtected)

 
const handleListening = () => console.log(`✅ Server listening on port ${port} 🚀`);
app.listen(port, handleListening) // handleListening => callback function
 