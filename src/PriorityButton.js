import './App.css';

function PriorityButton(props) {
    return (
       <button className={"priority-button" + (props.isSelectedPriority ? " selectedPriority" : "")}
          onClick={props.onChangePriority}>
           {"! ".repeat(props.level)}
       </button>
    )

}

export default PriorityButton;
