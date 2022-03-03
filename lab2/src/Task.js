import logo from './logo.svg';
import './App.css';
import {Fragment} from "react";
import checkboxEmpty from "./assets/checkboxEmpty.png";
import checkboxFull from "./assets/checkboxFull.png";
import trashcan from "./assets/trashcan.png";
import {useState} from "react";

function Task(props) {
    function handleCheck(e) {
        if (props.mode !== "delete") {
            // TODO - stretch goal - make it so that parents determine what happens when check is pressed
            // this would allow us to have the check box count as a selection in delete mode
            props.onChangeField(props.task.id, "completed", !props.task.completed)
            e.stopPropagation();
        }
    }

    function handleClick(e) {
        if (props.mode === "home") {
            props.onChangeMode("edit", props.task.id);
        }
        if (props.mode === "delete") {
            props.onToggleSelectTask(props.task.id);
        }
    }

    return (

        <li onClick={handleClick} className={`task${props.selected ? " selectedTask" : ""}`} >
            <img src={props.task.completed ? checkboxFull : checkboxEmpty} className="checkbox" onClick={handleCheck}/>
            <p>{props.task.name}</p>
        </li>

    );
}

export default Task;
