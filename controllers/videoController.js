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
    
}

export const upload = (req,res) => res.render("upload")
