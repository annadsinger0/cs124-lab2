import {useState} from "react";
import './App.css';

function DeleteModal(props) {

    return (
        <div className={"backdrop"}>
            <div className={"modal"}>
                <div className={"modal-text"}>
                Are you sure you would like to delete
                {props.mode === "edit" ? " this item?":
                    ` ${props.itemCount} ${props.itemType} items?`}
                </div>
                <br/>
                <div className={"modal-buttons"}>
                <button id={"cancel"} onClick={props.onCancel}>Cancel</button>
                <button id={"confirm"} onClick={props.onDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;