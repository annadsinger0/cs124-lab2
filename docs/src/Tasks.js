import logo from './logo.svg';
import './App.css';
import {Fragment} from "react";
import checkboxEmpty from "./assets/checkboxEmpty.png";
import checkboxFull from "./assets/checkboxFull.png";
import trashcan from "./assets/trashcan.png";
import Task from "./Task";

function Tasks(props) {
    let shownTasks = props.tasks;

    // Optionally remove completed tasks from the list of tasks to show
    if (!props.showCompleted) {
        shownTasks = shownTasks.filter(t => {
            return (!t.completed);
        });
    }

    shownTasks = shownTasks.map(t => <Task task={t} onChangeField={props.onChangeField} key={t.id}
                                           onToggleSelectTask={props.onToggleSelectTask}
                                           mode={props.mode} selected={props.selectedTaskIDs.includes(t.id)}
                                           onChangeMode={props.onChangeMode}/>);


    return (
        <ul id={"todolist"} className={props.mode === "delete" ? "delete-mode-list" : ''} >
            {shownTasks}
        </ul>

    );
}

export default Tasks;
