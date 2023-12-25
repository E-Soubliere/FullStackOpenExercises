const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favouriteBlog = (blogs) => {
    const favourite = blogs.reduce((fave, current) => {
        return(
            fave.likes > current.likes
                ? fave
                : current
        )
    })
    return ({
        title: favourite.title,
        author: favourite.author,
        likes: favourite.likes
    })
}

const mostBlogs = (blogs) => {
    const unique = blogs.filter((value, index, array) => {
        return (
            array.find((element) => element.author === value.author) === value
            )
    })
    const totalBlogs = unique.map((value) => {
        return (
            {
                author: value.author,
                blogs: blogs.reduce((sum, current) => current.author === value.author ? sum + 1 : sum, 0)
            }
        )
    })
    
    return totalBlogs.reduce((prev, current) => {
        return (
            prev.blogs > current.blogs
                ? prev
                : current
        )
    })
}

const mostLikes = (blogs) => {
    const unique = blogs.filter((value, index, array) => {
        return (
            array.find((element) => element.author === value.author) === value
            )
    })
    const likes = unique.map((value) => {
        return (
            {
                author: value.author,
                likes: blogs.reduce((sum, current) => current.author === value.author ? sum + current.likes : sum, 0)
            }
        )
    })
    
    return likes.reduce((prev, current) => {
        return (
            prev.likes > current.likes
                ? prev
                : current
        )
    })
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes,
}