import {useState} from "react";
import './App.css';

function DeleteModal(props) {



    return (
        <div className={"backdrop"}>
            <div className={"modal"}>
                Are you sure you would like to delete
                {props.mode === "edit" ? " this item" :
                    ` ${props.itemCount} ${props.itemType} items?`}
                <br/>
                <button id={"cancel"}>Cancel</button>
                <button id={"confirm"}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteModal;