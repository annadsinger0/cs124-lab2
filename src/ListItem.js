import './App.css';
import trashcan from "./assets/trashcan.png";

function ListItem(props) {

    function handleDelete(e) {
        props.onDelete();
        e.stopPropagation();
    }

    function handleLeaveList(e) {
        props.onLeaveList();
        e.stopPropagation();
    }

    function handleShowShareModal(e) {
        props.onShowShareModal();
        e.stopPropagation();
    }

    return (
        <li onClick={props.onClick} className={`task${props.selected ? " selectedTask" : ""}`}>
            <button className={"button"} id={"task-button"} onClick={props.onClick} >
                <p className={"task-name list-name"}>{props.list.name}</p>
            </button>

            <button className={"button underlined-button"} onClick={handleShowShareModal}>
                {props.list.editors.length - 1} editor{props.list.editors.length !== 2 && 's'}
            </button>

            {props.isOwner ?
                <>
                    <button className={"button trash-button"} onClick={handleDelete}>
                        <img src={trashcan} className="trash-image trash-image-smaller" alt={"delete list " + props.list.name}/>
                    </button>
                </>
                :
                <button className={"button"} onClick={handleLeaveList}>leave</button>
            }


        </li>
    );
}

export default ListItem;
