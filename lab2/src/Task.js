import logo from './logo.svg';
import './App.css';
import {Fragment} from "react";
import checkboxEmpty from "./assets/checkboxEmpty.png";
import checkboxFull from "./assets/checkboxFull.png";
import trashcan from "./assets/trashcan.png";
import {useState} from "react";

function Task(props) {
    function handleCheck(e) {
        props.onChangeField(props.task.id, "completed", !props.task.completed)
    }
    return (

        <li className={"task"}>
            <img src={props.task.completed ? checkboxFull : checkboxEmpty} className="checkbox" onClick={handleCheck}/>
            {/*{props.task.completed ? <img src={checkboxFull} className="checkbox" onClick={handleCheck}/>*/}
            {/*    : <img src={checkboxEmpty} className="checkbox" onClick={handleCheck}/>}*/}
            <p>{props.task.name}</p>
        </li>

    );
}

export default Task;
