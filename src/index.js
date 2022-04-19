import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import NewComment from './NewComment.jsx';
import Comment from './Comment.jsx';
import LoadMoreButton from './LoadMoreButton.jsx';
import Loader from './Loader.jsx';
import { commentSize } from './constants';
import './styles.css';

const App = () => {
    const [newCommentText, setNewCommentText] = useState("");
    const [comments, setComments] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const [numberCommentsToDisplay, setNumberCommentsToDisplay] = useState(commentSize);

    const fetchComments = async() => {
        setIsFetching(true);
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=0&_limit=${numberCommentsToDisplay}`);
            const json = await response.json();
            console.log(json);
            setComments([...json])
        } catch (error) {
            console.log(error);
        }
        setIsFetching(false);    
    }

    useEffect(()=> {
        fetchComments();
    }, [numberCommentsToDisplay])

    const loadMoreComments = () => {
        setNumberCommentsToDisplay(numberCommentsToDisplay + commentSize);
    }

    const addComment = async() => {
        setIsPosting(true);
        try {
            const newComment = await fetch('test.steps.me/test/testAssignComment', {
            method: 'POST',
            body: JSON.stringify({
                title: newCommentText.substring(0, 15),
                body: newCommentText,
                userId: 1
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            });
            
        } catch (error) {
            console.log(error)
        }
        setNewCommentText("");
        setIsPosting(false);
    }


 return <>
 <NewComment
    newCommentText={newCommentText}
    onChange={e => setNewCommentText(e.target.value)}
    onClick={addComment}
    isPosting={isPosting}
/>
 {comments?.length ? comments?.map((element, index)=>
 <Comment 
    key={index}
    title={element?.title}
    body={element?.body}
 />)
 : null}
 {!isFetching ? <LoadMoreButton onClick={loadMoreComments} /> : null}
 {isFetching ? <Loader /> : null}
     </>;
 }

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
