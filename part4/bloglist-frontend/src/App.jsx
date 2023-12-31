import { useState, useEffect, createRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [user, setUser] = useState(null)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')

    const blogFormRef = createRef()

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const user = await loginService.login({
              username, password,
            })
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

    const addBlog = (newBlog) => {
        newBlog['user'] = user
        setBlogs(blogs.concat(newBlog).sort((a, b) => b.likes - a.likes))
    }

    const removeBlog = (removedBlog) => {
        setBlogs(blogs.filter(b => b.id != removedBlog.id).sort((a, b) => b.likes - a.likes))
    }

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('LoggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
        
        blogService.getAll().then(blogs =>
            setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
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
                
                <h2>Blogs</h2>
                <Togglable buttonLabel="New Blog" ref={blogFormRef}>
                    <CreateBlog addBlog={addBlog} /> 
                </Togglable>
                
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} removeBlog={removeBlog}/>
                )}
            </div>
        )
    }
}

export default App