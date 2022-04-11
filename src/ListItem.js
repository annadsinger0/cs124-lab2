import './App.css';
import trashcan from "./assets/trashcan.png";

function ListItem(props) {

    function onDelete(e) {
        props.handleDelete();
        e.stopPropagation();
    }

    return (
        <li onClick={props.onClick} className={`task${props.selected ? " selectedTask" : ""}`}>
            <button className={"button"} id={"task-button"} onClick={props.onClick} >
                <p className={"task-name list-name"}>{props.list.name}</p>
            </button>

            <button className={"button"} onClick={onDelete}>
                <img src={trashcan} className="trash-image trash-image-smaller" alt={"delete list " + props.list.name}/>
            </button>
        </li>
    );
}

export default ListItem;
