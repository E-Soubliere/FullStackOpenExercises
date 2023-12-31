import { useState } from "react"

const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(false)

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
            {blog.title} {blog.author} <button onClick={() => {setVisible(!visible)}}>{visible ? "Hide" : "View"}</button>
            {visible &&
                <BlogDetails />
            }
        </div>  
    )
}

export default Blog