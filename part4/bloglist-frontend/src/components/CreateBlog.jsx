import { useState } from "react"
import blogService from '../services/blogs'

const CreateBlog = () => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newURL, setNewURL] = useState('')

    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')

    const handleCreateNew = async (e) => {
        e.preventDefault()
        try {
           const newBlog = await blogService.create({
               title: newTitle,
               author: newAuthor,
               url: newURL
           })
           setSuccessMessage(`${newBlog.title} by ${newBlog.author} added`)
           setTimeout(() => {
             setSuccessMessage('')
           }, 5000)
           setBlogs(blogs.concat(newBlog))
           setNewTitle('')
           setNewAuthor('')
           setNewURL('')
        } catch (error) {
           setErrorMessage("Unable to create blog")
           setTimeout(() => {
             setErrorMessage('')
           }, 5000)
        }
   }

    const setSuccessMessage = (message) => {
        setMessage(message)
        setMessageType('success')
    }
    const setErrorMessage = (message) => {
        setMessage(message)
        setMessageType('error')
    }

    return (
        <div>
            <h2>Create New</h2>
            {message &&
                <span style={{color: messageType == 'error' ? 'red' : 'green'}}>{message}</span>
            }
            <form onSubmit={handleCreateNew}>
                <table>
                    <tbody>
                        <tr>
                            <td>Title: </td>
                            <td><input value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>Author: </td>
                            <td><input value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td>URL: </td>
                            <td><input value={newURL} onChange={(e) => setNewURL(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td align='right'><button type='submit'>Submit</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default CreateBlog