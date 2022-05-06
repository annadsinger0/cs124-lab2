import './App.css';
import React, {useState} from "react";
import {updateDoc} from "firebase/firestore";
import {useDocumentData} from "react-firebase-hooks/firestore";
import {sendEmailVerification} from "firebase/auth";

function ShareModal(props) {

    const [editor, setEditor] = useState("");

    const [list, listLoading, listError] = useDocumentData(props.listDoc);

    const [emailSent, setEmailSent] = useState(false);

    const listUndefinedConsoleError = "Adding editor failed - database document loading is in progress or failed";

    function handleAddEditor() {
        if (listLoading || listError) {
            console.log(listUndefinedConsoleError);
            return;
        }
        if (!props.editors.includes(editor) && (editor !== "")) {
            updateDoc(props.listDoc, {editors: list.editors.concat(editor)});
            setEditor("");
        }
    }

    function handleRemoveEditor(editor) {
        if (listLoading || listError) {
            console.log(listUndefinedConsoleError);
            return;
        }
        return updateDoc(props.listDoc, {editors: list.editors.filter((e) => e !== editor)});
    }

    function handleKeyPress(e) {
        if(e.key === 'Enter') {
            handleAddEditor();
        }
    }

    return (
        <div className={"backdrop"}>
            <div className={"modal"} id={"share-modal"}>
                {props.listName && <h2>list: <span id={"list-name"}>{props.listName}</span></h2>}
                owner: {listLoading ? props.owner : list.owner}
                <br/>
                additional editors:
                <div id={"editor-list"}>
                    {(listLoading ? props : list).editors.filter((e) => e !== props.owner).map((e) =>
                        <div className={"editor-list-item"} key={e}>
                            <p className={"editor-list-p"}>{e}</p>
                            {(e !== props.owner) && (props.isOwner) &&
                                <button id={"remove-editor-button"} onClick={() => handleRemoveEditor(e)}>X</button>
                            }
                        </div>
                    )}
                </div>

                {props.isOwner && props.emailVerified &&
                    <input type="text" value={editor} className={"editor-input"}
                           onChange={e => setEditor(e.target.value)} onKeyPress={handleKeyPress}
                           placeholder={"add editor email"}/>
                }

                {props.isOwner && !props.emailVerified &&
                    <h2>verify your email to share lists</h2>
                }

                <div className={"modal-buttons"}>
                    <button id={"cancel"} onClick={props.onCancel} autoFocus={true}>done</button>

                    {props.isOwner && props.emailVerified && <button onClick={handleAddEditor} autoFocus={true}>add editor</button> }
                    {props.isOwner && !props.emailVerified && <button onClick={() => sendEmailVerification(props.user).then(() => setEmailSent(true))} autoFocus={true}>
                        {emailSent ? "sent!" : "send email verification"}
                    </button>}
                </div>
            </div>
        </div>
    )
}

export default ShareModal;