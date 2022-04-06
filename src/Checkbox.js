import './App.css';
import checkboxEmpty from "./assets/checkboxEmpty.png";
import checkboxFull from "./assets/checkboxFull.png";

function Checkbox(props) {
    return (
        <>
        {/*<img src={props.checked ? checkboxFull : checkboxEmpty} className="checkbox"*/}
        {/*    id={props.id} onClick={props.onToggle} alt={"checkbox"}*/}
        {/*     role="checkbox" aria-checked={props.checked}*/}
        {/*/>*/}
            <input type="checkbox" className={"checkbox"} id={props.id} onClick={props.onToggle}
                   checked={props.checked} disabled={props.disabled} aria-label={props.label}/>

        {/*<input id={props.id} type="checkbox" className="checkbox" onClick={props.onToggle} checked={props.checked}/>*/}
        {/*<label htmlFor={props.id} id="completed-item-show-label">*/}
        {/*    <img src={props.checked ? checkboxFull : checkboxEmpty} className="checkbox"*/}
        {/*         id={props.id} onClick={props.onToggle} alt={"checkbox"}/>*/}
        {/*</label>*/}
        </>
    );
}

export default Checkbox;