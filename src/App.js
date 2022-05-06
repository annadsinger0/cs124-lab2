import './App.css';
import ToDoListView from "./ToDoListView";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import React, {useState} from "react";
import AllListsView from "./AllListsView";
import {getAuth, signOut} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import SignIn from "./SignIn";



const firebaseConfig = {
    apiKey: "AIzaSyDOnElC_vlc65Fl1WVTUVg5pMcOivIv-Cw",
    authDomain: "cs124-lab3-a5cf8.firebaseapp.com",
    projectId: "cs124-lab3-a5cf8",
    storageBucket: "cs124-lab3-a5cf8.appspot.com",
    messagingSenderId: "1089016344467",
    appId: "1:1089016344467:web:a503e3b598a5e467acc266"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const auth = getAuth();

function App() {

    const [user, , ] = useAuthState(auth);

    const [listId, setListId] = useState("");

    function handleBackToAllListsView() {
        setListId("");
    }

    function handleChangeListId(id) {
        setListId(id);
    }

    function handleSignOut() {
        signOut(auth);
    }

    // TODO - when no tasks it looks weird

    // TODO - clean up firebase

    // TODO - fix resizing problems when title is too long (other ui also overflows page)

    return (
        <div id={"container"}>
            {user === null ? <SignIn auth={auth}/> :
                <>
                    <div>
                        <button className={"button"} id={"sign-out-button"} onClick={handleSignOut}>sign out</button>
                        <p>(logged in as: {auth.currentUser.email})</p>
                    </div>
                    {listId !== "" &&
                        <ToDoListView db={db} id={listId} onBackToAllListsView={handleBackToAllListsView} onSignOut={handleSignOut} auth={auth} />
                    }
                    {listId === "" &&
                        <AllListsView db={db} onChangeListId={handleChangeListId} onSignOut={handleSignOut} auth={auth} />
                    }
                </>
            }

        </div>
    );
}

export default App;
