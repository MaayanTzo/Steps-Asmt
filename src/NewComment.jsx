import React from 'react';
import './styles.css';

const NewComment = (props) => (<>
    <textarea
        value={props.newCommentText}
        className="newComment"
        placeholder="Type in a comment"
        onChange={props.onChange}
        >
    </textarea>
    <div className={`addButton ${props.isPosting ? "disabled" : ""}`} onClick={props.onClick}>Add Comment</div>
</>);

export default NewComment;