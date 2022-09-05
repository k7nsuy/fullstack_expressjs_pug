export const home = (req,res) => res.render("home", {pageTitle: "Home"}) // 변수를 보내는 방법
export const join = (req,res) => res.send("Join") // controller
export const login = (req,res) => res.send("Login")
export const search = (req,res) => res.send("Search")