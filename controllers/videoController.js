const videos = [
    {
        title: "Video 1",
        rating: 5,
        comments: 2,
        createAt: "2 minutes ago",
        views: 1,
        id: 1
    },
    {
        title: "Video 2",
        rating: 5,
        comments: 2,
        createAt: "2 minutes ago",
        views: 222,
        id: 2
    },
    {
        title: "Video 3",
        rating: 5,
        comments: 2,
        createAt: "2 minutes ago",
        views: 333,
        id: 3
    }
]

export const trending = (req,res) => {
    return res.render("home", {pageTitle: "Home", videos})
}
export const remove = (req,res) => res.send("remove")
export const watch = (req,res) => {
    const {id} = req.params
    const video = videos[id - 1]
    return res.render("watch", {pageTitle: `Watching : ${video.title}`, video})
}
export const getEdit = (req,res) => {
    const {id} = req.params
    const video = videos[id - 1]
    return res.render("edit", {pageTitle: `Editing : ${video.title}`, video})
}

export const postEdit = (req,res) => {
    const {id} = req.params
    const {title} = req.body;
    console.log(title);
    videos[id - 1].title = title
    return res.redirect(`/videos/${id}`)
}

export const getUpload = (req,res) => {
    return res.render("upload", {pageTitle : "Upload Video"})
}

export const postUpload = (req,res) => {
    const {title} = req.body
    const newVideo = {
            title: title,
            rating: 5,
            comments: 2,
            createAt: "2 minutes ago",
            views: 1,
            id: 1
    }
    // here we will add a video to the videos array
    console.log(req.body); // get the data from post request
    videos.push(newVideo) // push the new data into videos array
    console.log(videos); 
    return res.redirect("/")
}
