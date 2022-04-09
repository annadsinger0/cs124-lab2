import './App.css';
import ToDoListView from "./ToDoListView";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {useState} from "react";
import AllListsView from "./AllListsView";



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

function App(props) {

    const [listId, setListId] = useState("");

    function handleBackToAllListsView() {
        setListId("");
    }

    function handleChangeListId(id) {
        setListId(id);
    }

    // TODO - when no tasks it looks weird

    // TODO - clean up firebase

    // TODO - fix resizing problems when title is too long (other ui also overflows page)

    return (
        <div id={"container"}>
            {listId !== "" &&
                <ToDoListView db={db} id={listId} onBackToAllListsView={handleBackToAllListsView}/>
            }
            {listId === "" &&
                <AllListsView db={db} onChangeListId={handleChangeListId} />

            }
        </div>
    );
}

export default App;
