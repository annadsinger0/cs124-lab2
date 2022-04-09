import './App.css';
import trashcan from "./assets/trashcan.png";
import Checkbox from "./Checkbox";
import SortBy from "./SortBy";
import {useMediaQuery} from "react-responsive";

function Tools(props) {
    const showToolsInOneLine = useMediaQuery({maxWidth: 500});

    return (
        <>
            <div id="tools">
                <div id={"show-completed-items"}>
                    <label htmlFor="completed-item-show" id="completed-item-show-label">
                        Show completed items:
                    </label>
                    <Checkbox checked={props.showCompleted} id="completed-item-show-check"
                    onToggle={props.onToggleShowCompleted} label={"Show completed items"}/>
                </div>

                <SortBy onChangeSort={props.onChangeSort} itemType={props.itemType}/>

                {props.mode === "home" &&
                    <>
                        <div id={"trash"}>
                            <input type="checkbox" id="completed-item-show"/>
                            <button className={"button"} onClick={() => props.onChangeMode("delete")}>
                                <img src={trashcan} className="trash-image"  alt={"trash"}/>
                            </button>
                        </div>
                        <button className={"button"} onClick={props.onRenameList} id={"rename-list-button"}>Rename</button>
                    </>
                }
            </div>
        </>

    );
}

export default Tools;
