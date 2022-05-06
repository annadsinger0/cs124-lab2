import './App.css';
import {sendEmailVerification} from "firebase/auth";
import {useState} from "react";

function VerifyEmailModal(props) {

    const [emailSent, setEmailSent] = useState(false);

    return (
        <div className={"backdrop"}>
            <div className={"modal"} id={"leave-list-modal"}>
                <div className={"modal-text"}>
                    you have not verified your email yet
                    <br/>
                    to edit this list, please verify your email
                    <br/><br/>
                </div>
                <div className={"modal-buttons"}>
                    <button id={"cancel"} onClick={props.onCancel} autoFocus={true}>ok</button>
                    <button onClick={() => sendEmailVerification(props.user).then(() => setEmailSent(true))} autoFocus={true}>
                        {emailSent ? "sent!" : "send email verification"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmailModal;