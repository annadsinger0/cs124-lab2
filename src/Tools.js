import './App.css';
import trashcan from "./assets/trashcan.png";
import Checkbox from "./Checkbox";

function Tools(props) {
    return (
        <div id="tools">
            {(props.mode === "home" || props.mode === "delete") &&
                <label htmlFor="completed-item-show" id="completed-item-show-label">
                    <span>Show completed items</span>
                    {/*<img src={checkboxFull} className="checkbox" id="completed-item-show-check"/>*/}
                    <Checkbox checked={props.showCompleted} id="completed-item-show-check"
                              onToggle={props.onToggleShowCompleted} label={"Show completed items"}/>
                </label>
            }
            {props.mode === "home" ?
                <>
                    <input type="checkbox" id="completed-item-show"/>
                    {/*<img src={trashcan} id="trash" onClick={() => props.onChangeMode("delete")} alt={"trash"}/>*/}
                    <button className={"button"} onClick={() => props.onChangeMode("delete")}>
                        <img src={trashcan} id="trash-image"  alt={"trash"}/>
                    </button>
                </>
                    :
                <button onClick={props.onBack} className={"button"}>
                    <p id={"back-button-text"} onClick={props.onBack}> Back </p>
                </button>
            }
        </div>

    );
}

export default Tools;
