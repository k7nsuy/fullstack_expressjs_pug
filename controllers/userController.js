import user from "../src/models/user"
import bcrypt from "bcrypt"
import fetch from "node-fetch"

// Join
export const getJoin = (req,res) => res.render("join", {pageTitle: "Join"})
export const postJoin = async(req,res) => {
    const {userID, userName, email, password1 , password2 , location} = req.body
    const pageTitle = "Join"
    if(password1 !== password2) {
        return res.status(400).render("join", {
            pageTitle, 
            errorMessage: "The password confirmation does not match."
        })
    }
    
    const userExists = await user.exists({$or: [{userID},{email}] })
    if(userExists) {
        return res.status(400).render("join", {
            pageTitle, 
            errorMessage: "This name or email is already using."
        })
    }
    try {
        await user.create({
            userID,  
            userName,
            email,
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
    req.session.user = userIDCheck;

    return res.redirect("/")
}

export const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
      client_id: process.env.GITHUB_CLIENT,
      allow_signup: false,
      scope: "read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
  };

  export const finishGithubLogin = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
      client_id: process.env.GITHUB_CLIENT,
      client_secret: process.env.GITHUB_SECRET,
      code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await (
        await fetch(finalUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
      },
    })
    ).json()

    if("access_token" in tokenRequest) {
        // access api
        const {access_token} = tokenRequest
        const userRequest = await (
            await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `token ${access_token}`
            }
        })
        ).json()
        console.log(userRequest);
    } else {
      return res.redirect("/login")  
    }
  };

export const edit = (req,res) => res.send("Edit")
export const remove = (req,res) => res.send("remove")
export const see = (req,res) => res.send("See")
export const logout = (req,res) => res.send("logout")