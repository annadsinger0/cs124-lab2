import './App.css';

function Checkbox(props) {
    return (
            <input type="checkbox" className={"checkbox"} id={props.id} onClick={props.onToggle}
                   checked={props.checked} disabled={props.disabled} aria-label={props.label}/>
    );
}

export default Checkbox;