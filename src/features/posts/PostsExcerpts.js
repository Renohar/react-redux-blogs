import React from 'react'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { Link } from 'react-router-dom'



const PostsExcerpts = ({post}) => {
    return (
        <article>
            <h3>{post.title}</h3>
            <p className="post-body">{post.body.slice(0,50 )}...</p>
            <p className="post-meta">
                <Link to={`/post/${post.id}`} >View Post</Link>
                <div className="post-meta-n">
                <PostAuthor userId = {post.userId}/>
                <TimeAgo timestamp={post.date}/>
                </div>
                
                < ReactionButtons post={post} />
            </p>
        </article>
    )
}

export default PostsExcerpts 
