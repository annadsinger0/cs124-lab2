import logo from './logo.svg';
import './App.css';
import {Fragment} from "react";
import checkboxEmpty from "./assets/checkboxEmpty.png";
import checkboxFull from "./assets/checkboxFull.png";
import trashcan from "./assets/trashcan.png";
import Task from "./Task";

function Tasks(props) {
    return (

        <ul id="todolist">
            {props.tasks.map(t => <Task task={t} onChangeField={props.onChangeField}/>)}
        </ul>

    );
}

export default Tasks;
