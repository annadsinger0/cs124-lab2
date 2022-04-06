import './App.css';
import {useState} from "react";

function AddItem(props) {
    const [itemName, setItemName] = useState("");

    function handleKeyPress(e) {
        if((e.key === 'Enter') && (itemName !== "")) {
            handleAddItem();
        }
    }

    function handleAddItem() {
        props.onAddTask(itemName);
        setItemName("");
    }

    return (
        <div id="new-task">
            <input type="button" value="+" id="new-task-button" aria-label={props.placeholder}
                   onClick={handleAddItem} disabled={itemName === ""}/>
            <input type="text" id="new-task-input" placeholder={props.placeholder}
                   value={itemName} onChange={e => setItemName(e.target.value)}
                   onKeyPress={handleKeyPress}/>
        </div>
    );
}

export default AddItem;
