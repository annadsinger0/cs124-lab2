import logo from './logo.svg';
import './App.css';
import {Fragment} from "react";
import checkboxEmpty from "./assets/checkboxEmpty.png";
import checkboxFull from "./assets/checkboxFull.png";
import trashcan from "./assets/trashcan.png";

function Tools() {
    return (

        <div id="tools">
            <label htmlFor="completed-item-show" id="completed-item-show-label">
                <span>Show completed items</span>
                <img src={checkboxFull} className="checkbox" id="completed-item-show-check"/>
            </label>
            <input type="checkbox" id="completed-item-show"/>
            <img src={trashcan} id="trash"/>
        </div>

    );
}

export default Tools;
