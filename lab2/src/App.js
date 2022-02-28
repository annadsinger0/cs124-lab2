import logo from './logo.svg';
import './App.css';
import {Fragment} from "react";
import checkboxEmpty from "./assets/checkboxEmpty.png";
import checkboxFull from "./assets/checkboxFull.png";
import trashcan from "./assets/trashcan.png";

function App() {
  return (
      <Fragment>
      <head>
        <title>ToDo</title>
        <link rel="stylesheet" href="style.css"/>
      </head>
  <body>

  <h1>ToDo</h1>

  <div id="tools">
    <label htmlFor="completed-item-show" id="completed-item-show-label">
      <span>Show completed items</span>
      <img src={checkboxFull} className="checkbox" id="completed-item-show-check"/>
    </label>
    <input type="checkbox" id="completed-item-show"/>
      <img src={trashcan} id="trash"/>
  </div>


  <ul id="todolist">
    <li>
      <img src={checkboxEmpty} className="checkbox"/>
      <p>Buy new John Grisham book</p>
    </li>
    <li>
      <img src={checkboxFull} className="checkbox"/>
      <p>another lowercase task</p>
    </li>
    <li>
      <img src={checkboxEmpty} className="checkbox"/>
      <p>SOME REALLY IMPORTANT UPPERCASE TASK</p>
    </li>
  </ul>

  <div id="new-task">
    <input type="button" value="+" id="new-task-button"/>
      <input type="text" id="new-task-input" placeholder="Add task"/>

  </div>


  </body>
      </Fragment>);
}

export default App;
