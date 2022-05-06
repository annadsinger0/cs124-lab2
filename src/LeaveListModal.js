import './App.css';

function LeaveListModal(props) {

    return (
        <div className={"backdrop"}>
            <div className={"modal"} id={"leave-list-modal"}>
            <div className={"modal-text"}>
                are you sure you would like to leave this list?
                <br/>
                if you want to rejoin, the owner will need to re-add you
            </div>
                <div className={"modal-buttons"}>
                    <button id={"cancel"} onClick={props.onCancel} autoFocus={true}>stay</button>
                    <button onClick={props.onLeaveList} autoFocus={true}>leave</button>
                </div>
            </div>
        </div>
    )
}

export default LeaveListModal;