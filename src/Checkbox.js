import './App.css';

function Checkbox(props) {
    return (
        //TODO - You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.

        <input type="checkbox" className={"checkbox"} id={props.id} onClick={props.onToggle}
               checked={props.checked} disabled={props.disabled} aria-label={props.label}
               onChange={() => console.log()} />
    );
}

export default Checkbox;