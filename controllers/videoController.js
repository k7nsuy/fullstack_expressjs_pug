import Video from "../src/models/video"

export const home = async (req,res) => {
    const videos = await Video.find({})         
    return res.render("home", {pageTitle: "Home", videos})
}
export const remove = (req,res) => res.send("remove")
export const watch = (req,res) => {
    const {id} = req.params
    
    return res.render("watch", {pageTitle: `Watching`})
}
export const getEdit = (req,res) => {
    const {id} = req.params
    
    return res.render("edit", {pageTitle: `Editing`})
}

export const postEdit = (req,res) => {
    const {id} = req.params
    const {title} = req.body;
    console.log(title);
    return res.redirect(`/videos/${id}`)
}

export const getUpload = (req,res) => {
    return res.render("upload", {pageTitle : "Upload Video"})
}


export const postUpload = async (req,res) => {
    const {title, description, hashtags} = req.body
    try {
        console.log(req.body); // get the data   from post request
        await Video.create({
            title, // same with title:title(req.body.title)
            description,
            createdAt: Date.now(), // Select date now
            hashtags: hashtags.split(",").map((word) => `#${word}`),
            meta: {
                views: 0,
                rating: 0,
            }
        })
        return res.redirect("/")
    } catch (error) {
        console.log(error);
    }
    
}




    // const newVideo = {
    //         title: title,
    //         rating: 5,
    //         comments: 2,
    //         createAt: "2 minutes ago",
    //         views: 1,
    //         id: 4
    // }
    // here we will add a video to the videos array
    // videos.push(newVideo) // push the new data into videos array
