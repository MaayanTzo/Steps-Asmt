import React from 'react';
import './styles.css';

const LoadMoreButton = (props) => (
<div className="loadButton" onClick={props.onClick}>
    See 20 more comments
</div>);

export default LoadMoreButton;