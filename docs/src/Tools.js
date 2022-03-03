import logo from './logo.svg';
import './App.css';
import {Fragment} from "react";
import checkboxEmpty from "./assets/checkboxEmpty.png";
import checkboxFull from "./assets/checkboxFull.png";
import trashcan from "./assets/trashcan.png";

function Tools(props) {
    return (
        <div id="tools">
            <>
            </>
            {(props.mode === "home" || props.mode === "delete") &&
                <label htmlFor="completed-item-show" id="completed-item-show-label">
                    <span>Show completed items</span>
                    {/*<img src={checkboxFull} className="checkbox" id="completed-item-show-check"/>*/}
                    <img src={props.showCompleted ? checkboxFull : checkboxEmpty} className="checkbox"
                         id="completed-item-show-check" onClick={props.onToggleShowCompleted}/>
                </label>
            }
            {props.mode === "home" ?
                <>
                    <input type="checkbox" id="completed-item-show"/>
                    <img src={trashcan} id="trash" onClick={() => props.onChangeMode("delete")}/>
                </>
                    :
                <p style={{marginLeft: "auto"}} onClick={props.onBack}> Back </p>
            }
        </div>

    );
}

export default Tools;
