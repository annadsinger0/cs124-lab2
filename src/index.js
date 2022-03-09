import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import Iframe from './Iframe';
import reportWebVitals from './reportWebVitals';

const initialData = [
    {name: "1", id: 1, completed: false},
    {name: "2", id: 2, completed: true},
    {name: "3", id: 3, completed: false},
    {name: "4", id: 4, completed: true},
    {name: "5", id: 5, completed: false},
]

ReactDOM.render(
  <React.StrictMode>
    <App initialData={initialData}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
