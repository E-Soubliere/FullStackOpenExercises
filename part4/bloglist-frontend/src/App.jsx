import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newURL, setNewURL] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const user = await loginService.login({
              username, password,
            })
            //setUser(user)
            window.localStorage.setItem('LoggedBlogAppUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
          } catch (exception) {
            setErrorMessage("Username or password incorrect")
            setTimeout(() => {
              setErrorMessage('')
            }, 5000)
          }
    }

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

    const handleLogout = async () => {
        window.localStorage.removeItem('LoggedBlogAppUser')
        setUser(null)
    }

    const setSuccessMessage = (message) => {
        setMessage(message)
        setMessageType('success')
    }
    const setErrorMessage = (message) => {
        setMessage(message)
        setMessageType('error')
    }

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('LoggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
        
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )  
    }, [])

    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <div style={{paddingLeft: '3px', minHeight: '20px'}}>
                    {message &&
                        <span style={{color: messageType == 'error' ? 'red' : 'green'}}>{message}</span>
                    }
                </div>
                <form onSubmit={handleLogin}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Username</td>
                                <td><input value={username} onChange={(e) => setUsername(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td><input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td align='right'><button type='submit'>Login</button></td>
                            </tr> 
                        </tbody>
                    </table>
                </form>
            </div>
        )
    } else {
        return (
            <div>
                <p>{user.name} logged in</p>
                <button onClick={handleLogout}>Logout</button>
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
                
                <h2>blogs</h2>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )}
            </div>
        )
    }
}

export default App