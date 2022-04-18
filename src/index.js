import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';

import './styles.css';

const App = () => {
    const [comments, setComments] = useState([]);

    useEffect(()=> {
        const fetchComments = async() => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const json = await response.json();
                console.log(json);
                setComments([...json])
            } catch (error) {
                console.log('error', error);
            }    
        }
        
        fetchComments();
    }, [])


 return <>{comments?.length ? comments?.map((element, index)=>
 <div key={index}>
     <h4 className="title">{element?.title}</h4>
     <div>{element?.body}</div>
 </div>)
 : null}</>;
 }

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
