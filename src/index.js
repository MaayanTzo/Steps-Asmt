import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';

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
            console.log('error', error);
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
            console.log('error', error)
        }
        setNewCommentText("");
        setIsPosting(false);
    }


 return <>
 <textarea
    value={newCommentText}
    className="newComment"
    placeholder="Type in a comment"
    onChange={e => setNewCommentText(e.target.value)}
 ></textarea>
 <div className={`addButton ${isPosting ? "disabled" : ""}`} onClick={addComment}>Add Comment</div>
 {comments?.length ? comments?.map((element, index)=>
 <div key={index} className="commentWrapper">
     <div className="commentTitle">{element?.title}</div>
     <div className="commentBody">{element?.body}</div>
 </div>)
 : null}
 {!isFetching ? <div className="loadButton" onClick={loadMoreComments}>See 20 more comments</div> : null}
 {isFetching ? <div className="loaderWrapper"><div className="lds-ellipsis">
     <div></div>
     <div></div>
     <div></div>
     </div>
     </div> : null}
     </>;
 }

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
