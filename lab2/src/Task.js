import logo from './logo.svg';
import './App.css';
import {Fragment} from "react";
import checkboxEmpty from "./assets/checkboxEmpty.png";
import checkboxFull from "./assets/checkboxFull.png";
import trashcan from "./assets/trashcan.png";

function Task(props) {
    return (

        <li className={"task"}>
            {props.task.completed ? <img src={checkboxFull} className="checkbox"/>
                : <img src={checkboxEmpty} className="checkbox"/>}
            <p>{props.task.name}</p>
        </li>

    );
}

export default Task;
