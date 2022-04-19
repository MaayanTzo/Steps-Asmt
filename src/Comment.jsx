import React from 'react';
import './styles.css';

const Comment = (props) => (<div key={props.key} className="commentWrapper">
<div className="commentTitle">{props.title}</div>
<div className="commentBody">{props.body}</div>
</div>);

export default Comment;