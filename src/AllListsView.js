import './App.css';
import { useEffect} from "react";
import Tools from "./Tools";
import Tasks from "./Tasks";
import AddItem from "./AddItem";
import {useState} from "react";
import DeleteTasks from "./DeleteTasks";
import EditTask from "./EditTask";
import SortBy from "./SortBy";

import { initializeApp } from "firebase/app";
import { getFirestore, query, orderBy, collection, doc, updateDoc, deleteDoc, setDoc, serverTimestamp } from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import ListItem from "./ListItem";
import Checkbox from "./Checkbox";
import trashcan from "./assets/trashcan.png";
import DeleteModal from "./DeleteModal";

function AllListsView(props) {
    const listsCollection = collection(props.db, "lists");

    // modes: home, delete
    // const [mode, setMode] = useState("home");

    const [deleteModalState, setDeleteModalState] = useState("none");

    const Queries = {
        CreatedSort: query(listsCollection, orderBy("created")),
        NameSort: query(listsCollection, orderBy("name")),
    };

    // created, priority, name, completed
    const [sortBy, setSortBy] = useState(Queries["CreatedSort"]);

    const [lists, loading, ] = useCollectionData(sortBy);

    function handleChangeField(id, changeField, value) {
        updateDoc(doc(listsCollection, "lists/"+id), {[changeField]: value});
    }

    function handleDeleteID(id) {
        deleteDoc(doc(listsCollection, id));
        // setMode("home");
    }

    function handleAddList(name) {
        const id = generateUniqueID();
        setDoc(doc(listsCollection, id), {name: name, id: id, created: serverTimestamp()});
    }

    function handleSetSortBy(sort) {
        setSortBy(Queries[sort]);
    }

    function handleClick(id) {
        props.onChangeListId(id)
    }

    function handleDelete(list) {
        setDeleteModalState(list)
    }

    function handleDeleteButtonModal() {
        handleDeleteID(deleteModalState.id)
        setDeleteModalState("none")
    }

    return (
        <>
            <h1 className={"title"}>ToDo</h1>

            {/*TODO delete this*/}
            <div id="tools">
                    <SortBy onChangeSort={handleSetSortBy} mode={"list"} />
                    {/*<>*/}
                    {/*    <button className={"button"} onClick={() => setMode("delete")}>*/}
                    {/*        <img src={trashcan} id="trash-image"  alt={"trash"}/>*/}
                    {/*    </button>*/}
                    {/*</>*/}

            </div>

            {loading && <h1>loading</h1>}
            <ul id={"all-lists"}>
                {lists && lists.map((list) =>
                    <ListItem list={list} selected={false} handleDelete={() => handleDelete(list)}
                              onClick={() => handleClick(list.id)} />
                )}
            </ul>


            <AddItem onAddTask={handleAddList} placeholder={"Add list"}/>
            {/*<button onClick={() => handleAddList("thing")}>create new</button>*/}

            {deleteModalState !== "none" &&
                <DeleteModal mode={props.mode}
                             itemType={deleteModalState}
                             onDelete={handleDeleteButtonModal} listMode={true} listName={deleteModalState.name}
                             onCancel={() => setDeleteModalState("none")}/>}
        </>
    );
}

export default AllListsView;
