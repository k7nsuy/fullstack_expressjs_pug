import express from "express";

const app = express() 
const port = 3000

const handleHome = (req,res) => {
    console.log(`hihi`);
    return res.send(`I still love you`)
}

const handleLogin = (req,res) => {
    return res.send(`login here`) 
}

app.get('/', handleHome)
app.get('/login', handleLogin)

const handleListening = () => console.log(`✅ Server listening on port ${port} 🚀`);
app.listen(port, handleListening) // handleListening => callback function
