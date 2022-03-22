import './App.css';

function PriorityButton(props) {
    return (
       <p className={"priority-button" + (props.isSelectedPriority ? " selectedPriority" : "")}
          onClick={props.onChangePriority}>
           {"! ".repeat(props.level)}
       </p>
    )

}

export default PriorityButton;
