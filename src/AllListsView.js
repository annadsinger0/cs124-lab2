import './App.css';
import AddItem from "./AddItem";
import React, {useState} from "react";
import SortBy from "./SortBy";

import {
    query,
    orderBy,
    collection,
    doc,
    deleteDoc,
    setDoc,
    serverTimestamp,
    where,
    updateDoc
} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import ListItem from "./ListItem";
import DeleteModal from "./DeleteModal";
import Checkbox from "./Checkbox";
import ShareModal from "./ShareModal";
import LeaveListModal from "./LeaveListModal";
import VerifyEmailModal from "./VerifyEmailModal";

function AllListsView(props) {
    const listsCollection = collection(props.db, "lists");

    // modes: home, delete
    // const [mode, setMode] = useState("home");

    const [deleteModalState, setDeleteModalState] = useState("none");
    const [showSharedLists, setShowSharedLists] = useState(true);
    const [shareModalState, setShareModalState] = useState(null);
    const [leaveListModalState, setLeaveListModalState] = useState(null);
    const [verifyEmailModalState, setVerifyEmailModalState] = useState(false)

    const SortByEnum = {
        SortByCreated: orderBy("created"),
        SortByName: orderBy("name"),
    };

    // created, priority, name, completed
    const [sortBy, setSortBy] = useState(SortByEnum["SortByCreated"]);

    const [lists, loading, error] = useCollectionData(query(listsCollection, sortBy,
        where("editors", "array-contains", props.auth.currentUser.email)));

    function handleDeleteID(id) {
        deleteDoc(doc(listsCollection, id));
    }

    function handleAddList(name) {
        const id = generateUniqueID();
        setDoc(doc(listsCollection, id), {name: name, id: id, created: serverTimestamp(),
            owner: props.auth.currentUser.email, editors:[props.auth.currentUser.email]});
    }

    function handleLeaveList() {
        setLeaveListModalState(null)
        updateDoc(doc(props.db, "lists/"+leaveListModalState.id),
            {editors: leaveListModalState.editors.filter((e) => e !== props.auth.currentUser.email)}
        ) // .then(() => setLeaveListModalState(null));
    }

    function handleSetSortBy(sort) {
        setSortBy(SortByEnum[sort]);
    }

    function handleClick(list) {
        if (list.owner === props.auth.currentUser.email || props.auth.currentUser.emailVerified) {
            props.onChangeListId(list.id)
            return;
        }

        // the user is neither the owner nor email verified
        props.auth.currentUser.reload();
        props.auth.currentUser.emailVerified ?
            props.onChangeListId(list.id)
            :
            setVerifyEmailModalState(true);
    }

    function handleDelete(list) {
        setDeleteModalState(list)
    }

    function handleDeleteButtonModal() {
        handleDeleteID(deleteModalState.id)
        setDeleteModalState("none")
    }

    console.log(error);

    return (
        <>
            <h1 className={"title"}>Your Lists</h1>

            <div id="tools">

                <div id={"show-shared-lists"}>
                    <label htmlFor="completed-item-show" id="completed-item-show-label">
                        show shared lists:
                    </label>
                    <Checkbox checked={showSharedLists} id="completed-item-show-check"
                              onToggle={() => setShowSharedLists(!showSharedLists)} label={"Show completed items"}/>
                </div>

                <SortBy onChangeSort={handleSetSortBy} mode={"list"} />
            </div>

            {loading && <h1>loading</h1>}

            {(!loading && lists && lists.length === 0) && <h1>No lists</h1>}

            {error && <h1> - Error! Please try again</h1>}

            { !error &&
                <>
                <ul id={"all-lists"}>
                    {lists && lists.map((list) =>
                        ((showSharedLists || (props.auth.currentUser.email === list.owner)) &&
                        <ListItem list={list} selected={false} onDelete={() => handleDelete(list)}
                                  onClick={() => handleClick(list)} key={list.id}
                                  isOwner={props.auth.currentUser.email === list.owner}
                                  onShowShareModal={() => setShareModalState(list)}
                                  onLeaveList={() => setLeaveListModalState(list)}/>
                        )
                    )}
                </ul>

                <AddItem onAddTask={handleAddList} placeholder={"Add list"}/>

            {deleteModalState !== "none" &&
                <DeleteModal mode={props.mode}
                itemType={deleteModalState}
                onDelete={handleDeleteButtonModal} listMode={true} listName={deleteModalState.name}
                onCancel={() => setDeleteModalState("none")}/>}
                </>
            }

            {shareModalState !== null &&
                <ShareModal owner={shareModalState.owner} editors={shareModalState.editors}
                            listDoc={doc(props.db, "lists/"+shareModalState.id)}
                            onCancel={() => setShareModalState(null)} user={props.auth.currentUser}
                            listName={shareModalState.name} emailVerified={props.auth.currentUser.emailVerified}
                            isOwner={props.auth.currentUser.email === shareModalState.owner}
                />
            }

            {leaveListModalState !== null &&
                <LeaveListModal
                    onCancel={() => setLeaveListModalState(null)}
                    onLeaveList={handleLeaveList}
                />
            }

            {verifyEmailModalState &&
                <VerifyEmailModal onCancel={() => setVerifyEmailModalState(false)} user={props.auth.currentUser}/>
            }
        </>

    );
}

export default AllListsView;
