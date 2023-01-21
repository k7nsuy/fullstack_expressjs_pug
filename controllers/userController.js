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
    const userIDCheck  = await user.findOne({userID, socialOnly: false})
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
        const apiUrl = "https://api.github.com"
        const userData = await (
            await fetch(`${apiUrl}/user`, {
            headers: {
                Authorization: `token ${access_token}`
            }
        })
        ).json()
        const emailData = await (
            await fetch(`${apiUrl}/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`
                }
            })
        ).json()
        const emailObject = emailData.find(
            (email) => email.primary === true && email.verified === true
        )
        if (!emailObject) {
            return res.redirect("/login")
        }
        console.log(userData);
        let existingUser = await user.findOne({email: emailObject.email})
        if(!existingUser) {
            // create an account
            existingUser = await user.create({
                avatarUrl: userData.avatarUrl,
                userID: userData.name,  
                userName: userData.login,
                email: emailObject.email,
                password1: "",
                socialOnly: true,
                location: userData.location
            })
        }
            req.session.loggedIn = true
            req.session.user = existingUser
            return res.redirect("/")
    } else {
      return res.redirect("/login")  
    }
  };

export const getEdit = (req,res) => {
    return res.render('edit-profile', {pageTitle:'Edit Profile', user: req.session.user})
}

export const postEdit = async (req,res) => {
    const {session: {
        user: {_id}
    },
        body: {userID,
            email,
            userName,
            location}
        } = req
    const updateUser = await user.findByIdAndUpdate(_id, {
        userID, email, userName, location
    },{new:true})
    req.session.user = updateUser
    return res.redirect('/users/edit')
}

export const see = (req,res) => res.send("See")
export const logout = (req,res) => {
    req.session.destroy()
    return res.redirect("/")
}