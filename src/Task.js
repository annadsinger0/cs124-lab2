import './App.css';
import Checkbox from "./Checkbox";

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
        <li onClick={handleClick} className={`task${props.selected ? " selectedTask" : ""}`}>
            <Checkbox checked={props.task.completed} id="completed-item-show-check"
                      onToggle={handleCheck} label={props.task.name}
                      disabled={props.mode === "delete"}/>
            {/*<img src={props.task.completed ? checkboxFull : checkboxEmpty} className="checkbox" onClick={handleCheck} alt={"checkbox"}/>*/}
                    <button className={"button"} id={"task-button"} onClick={handleClick} disabled={props.mode === "edit"}>
                        <p className={"task-name"}>{props.task.name}</p>
                    </button>

            <p className={"priority-display"} aria-label={"priority level " + props.task.priority}>{"! ".repeat(props.task.priority)}</p>
        </li>
    );
}

export default Task;
