import './App.css';
import trashcan from "./assets/trashcan.png";
import Checkbox from "./Checkbox";
import SortBy from "./SortBy";
import React from "react";

function Tools(props) {
    return (
        <>
            <div id="tools">
                <SortBy onChangeSort={props.onChangeSort} itemType={props.itemType}/>
                <div id={"show-completed-items"}>
                    <label htmlFor="completed-item-show" id="completed-item-show-label">
                        show completed items:
                    </label>
                    <Checkbox checked={props.showCompleted} id="completed-item-show-check"
                    onToggle={props.onToggleShowCompleted} label={"Show completed items"}/>
                </div>



                {props.mode === "home" &&
                    <>
                        <div id={"trash"}>
                            <input type="checkbox" id="completed-item-show"/>
                            <button className={"button trash-button"} onClick={() => props.onChangeMode("delete")}>
                                <img src={trashcan} className="trash-image"  alt={"trash"}/>
                            </button>
                        </div>
                        <button className={"button"} onClick={props.onRenameList} id={"rename-list-button"}>rename</button>
                        <button onClick={props.onShowEditors} className={"button"} id={"show-editors-button"}>editors</button>
                        {!props.isOwner &&
                            <button onClick={props.onLeaveList} className={"button"} id={"leave-list-button"}>leave list</button>
                        }
                    </>
                }
            </div>
        </>

    );
}

export default Tools;
