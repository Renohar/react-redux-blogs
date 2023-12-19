import React from 'react'
import {useState} from 'react'
import {useDispatch, useSelector} from  'react-redux'
import { addNewPost } from './postsSlice'
import {selectAllUsers} from '../users/usersSlice'
import { useNavigate} from 'react-router-dom'

const AddPostForm = () => {

    const dispatch = useDispatch( )
    const navigate = useNavigate()
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const [userId, setUserId] = useState('')
    const users = useSelector(selectAllUsers)

    const [addRequestStatus,setAddRequestStatus] = useState('idle')

    const onTitleChanged = (e) => setTitle(e.target.value)
    const onContentChanged = (e) => setContent(e.target.value)
    const onAuthorChanged = (e) => setUserId(e.target.value) 

    const canSave = [title,content,userId].every(Boolean) && addRequestStatus === 'idle'

    const onSavePostClicked = () => {
        if(canSave){
            try{
                setAddRequestStatus('pending')
                dispatch(addNewPost({title,body:content,userId})).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
                navigate('/')
            }
            catch(err){

            }
            finally{
                setAddRequestStatus('idle')
            }
        }
    }

    // const onSavePostClicked = () => {
    //     if ( title && content) {
    //         dispatch (
    //             postAdded(title,content,userId
    //             )
    //         )
    //         setContent('')
    //         setTitle('')
    //     }
    // }

    // const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

    const usersOptions = users.map(
        user => (
            <option key={user.id} value={user.id}>
                {user.name}
            </option>
        )
    )

    return (
        <div>
            <form >

                <label htmlFor="add_post_title">Add Title: </label>
                <input 
                id="add_post_title"
                type="text"
                required
                value={title}
                onChange = {onTitleChanged}
                />

                <label htmlFor="postAuthor">Select Author:</label>
                <select
                id="postAuthor"
                type="text"
                required
                value={userId}
                onChange = {onAuthorChanged}
                >
                    <option value=""></option>
                    {usersOptions}
                </select>

                <label htmlFor="add_post_content">Add Content: </label>
                <input 
                id="add_post_content"
                type="text"
                required
                value={content}
                onChange = {onContentChanged}
                />

                <button onClick= {onSavePostClicked }
                disabled = {!canSave}
                 type="submit"> Add Post</button>

            </form>
        </div>
    )
}

export default AddPostForm
