import {useSelector} from 'react-redux'
// import {useEffect} from 'react'
import React from 'react'
import { selectAllPosts,getPostsError,getPostsStatus} from './postsSlice'
import PostsExcerpts from './PostsExcerpts'
// import PostAuthor from './PostAuthor'
// import TimeAgo from './TimeAgo'
// import ReactionButtons from './ReactionButtons'



const PostsList = () => {

    // const dispatch = useDispatch()
    const posts = useSelector(selectAllPosts)
    const postStatus  = useSelector(getPostsStatus)
    const error = useSelector(getPostsError)

    // useEffect(
    //     () => {
    //         if (postStatus === 'idle'){
    //             dispatch(fetchPosts())  
    //         }
    //     },
    //     [postStatus,dispatch]
    // )

    // const orderedPosts = posts.slice().reverse()

    let content;

    if (postStatus === 'loading'){
        content = <p>"Loading..."</p>
    }

    else if (postStatus === 'succeeded'){

        const orderedPosts = posts.slice().sort (
            (a,b) => b.date.localeCompare(a.date)
        )
        content = orderedPosts.map(
            post => (
                <PostsExcerpts 
                key = {post.id}
                post = {post}
                />
            )
        )

    }

    

    else if (postStatus === 'failed'){
        content = <p>{error}</p>
    }

    



    return (
        <div className="content">
            {content}
            
        </div>
    )
}

export default PostsList
