import multer from "multer"

export const localsMiddleware = (req,res,next) => {
    res.locals.siteName = "wetube"
    res.locals.loggedIn = Boolean(req.session.loggedIn)
    res.locals.loggedInUser = req.session.user || {}
    next()
}

export const protectedMiddleware = (req,res,next) => {
    if(req.session.loggedIn) {
        return next()
    } else {
        return res.redirect('/login')
    }
}

export const pubicOnlyMiddleware = (req,res,next) => {
    if(!req.session.loggedIn) {
        return next()
    } else {
        return res.redirect('/')
    }
}

// use the multer package to upload files in Node.js
export const uploadAvatar = multer({dest: 'uploads/avatars/', 
    limits: {
        fileSize: 3000000,
}})

export const uploadVideo = multer({dest: 'uploads/videos/', 
    limits: {
        fileSize: 10000000,
}})


