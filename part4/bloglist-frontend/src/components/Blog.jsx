import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, removeBlog }) => {
    const [visible, setVisible] = useState(false)

    const handleRemove = async () => {
        try {
            if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
                blogService.remove(blog.id)
                removeBlog(blog)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const blogStyle = {
        paddingBottom: '10px'
    }

    const BlogDetails = () => {
        return (
            <div style={blogStyle}>
                {blog.url} <br/>
                likes: {blog.likes} <button>Like</button><br/>
                {blog.user && blog.user.name}
            </div>
        )
    }
    return (
        <div>
            {blog.title} {blog.author} 
            <button style={{margin: '0 10px'}} onClick={() => {setVisible(!visible)}}>{visible ? "Hide" : "View"}</button>
            <button onClick={handleRemove}>Delete</button>
            {visible &&
                <BlogDetails />
            }
        </div>  
    )
}

export default Blog