import user from "../src/models/user"
import bcrypt from "bcrypt"

// Join
export const getJoin = (req,res) => res.render("join", {pageTitle: "Join"})
export const postJoin = async(req,res) => {
    const {userID, email,userName, password1 , password2 , location} = req.body
    if(password1 !== password2) {
        return res.status(400).render("join", {
            pageTitle:"Join", 
            errorMessage: "The password confirmation does not match."
        })
    }
    
    const userExists = await user.exists({$or: [{userID},{email}]})
    if(userExists) {
        return res.status(400).render("join", {
            pageTitle:"Join", 
            errorMessage: "This name or email is already using."
        })
    }
    try {
        await user.create({
            userID,  
            email,
            userName,
            password1,
            location
        })
        return res.redirect("/login")
    } catch (error) {
        return res.status(400).render("join", {
            pageTitle:"Join", 
            errorMessage: error._message
        })
    }
}

// Login
export const getLogin = (req,res) => res.render("login", {pageTitle: "Login"})
export const postLogin = async(req,res) => {
    // check if the account exists
    // check if the ID and the password match
    const {userID, password} = req.body
    const userIDCheck  = await user.findOne({userID})
    if(!userIDCheck) {
        return res.status(400).render("login", {
            pageTitle: "Login",
            errorMessage: "This userID hasn't been joined yet"})
    }
    const ok = await bcrypt.compare(password, userIDCheck.password1)
    if(!ok) {
        return res.status(400).render("login", {
            pageTitle: "Login",
            errorMessage : "Wrong Password" 
        })
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/")
}
export const edit = (req,res) => res.send("Edit")
export const remove = (req,res) => res.send("remove")
export const see = (req,res) => res.send("See")
export const logout = (req,res) => res.send("logout")