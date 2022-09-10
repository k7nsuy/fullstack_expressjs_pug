const videos = [
    {
        title: "Hello 1",
        rating: 5,
        comments: 2,
        createAt: "2 minutes ago",
        views: 59,
        id: 1
    },
    {
        title: "Hello 2",
        rating: 5,
        comments: 2,
        createAt: "2 minutes ago",
        views: 59,
        id: 2
    },
    {
        title: "Hello 3",
        rating: 5,
        comments: 2,
        createAt: "2 minutes ago",
        views: 59,
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
    return res.render("watch", {pageTitle: `Watching ${video.title}`, video})
}
export const edit = (req,res) => res.render("edit")
export const upload = (req,res) => res.render("upload")
