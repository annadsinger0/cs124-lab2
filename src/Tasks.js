import './App.css';
import Task from "./Task";

function Tasks(props) {

    let shownTasks = props.tasks;

    if (shownTasks.length === 0)
        return <h1 id={"no-tasks"}> No Tasks </h1>;


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
