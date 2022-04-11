import './App.css';

function PriorityButton(props) {
    return (
       <button className={"priority-button" + (props.isSelectedPriority ? " selectedPriority" : "")}
          onClick={props.onChangePriority} aria-label={"priortity level " + props.level +
           (props.isSelectedPriority ? " selected" : "")}>
           {"! ".repeat(props.level)}
       </button>
    )

}

export default PriorityButton;
