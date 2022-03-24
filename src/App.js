import './App.css';
import { useEffect} from "react";
import Tools from "./Tools";
import Tasks from "./Tasks";
import AddTask from "./AddTask";
import {useState} from "react";
import DeleteTasks from "./DeleteTasks";
import EditTask from "./EditTask";
import SortBy from "./SortBy";

import { initializeApp } from "firebase/app";
import { getFirestore, query, orderBy, collection, doc, updateDoc, deleteDoc, setDoc, serverTimestamp } from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";


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

const collectionName = "tasks";

function App(props) {
    const [showCompleted, setShowCompleted] = useState(true);
    const [selectedTaskIDs, setSelectedTaskIDs] = useState([]);
    // modes: home, delete, edit
    const [mode, setMode] = useState("home");

    const [editTaskID, setEditTaskID] = useState(1);

    const Queries = {
        CreatedSort: query(collection(db, collectionName), orderBy("created")),
        PrioritySort: query(collection(db, collectionName), orderBy("priority", "desc")),
        NameSort: query(collection(db, collectionName), orderBy("name")),
        CompletedSort: query(collection(db, collectionName), orderBy("completed"))
    };

    // created, priority, name, completed
    const [sortBy, setSortBy] = useState(Queries["CreatedSort"]);

    const [tasks, loading, ] = useCollectionData(sortBy);

    function handleChangeField(id, changeField, value) {
        // setTasks(tasks.map(task => task.id === id ?
        //     {...task, [changeField]: value} : task ));

        updateDoc(doc(db, collectionName, id), {[changeField]: value});
    }

    function handleChangeMode(newMode, newEditTaskID = null) {
        if (tasks.length === 0 && newMode === "delete") { // pressed delete with no tasks -> no need to change mode
            return;
        }
        if (newEditTaskID) {
            setEditTaskID(newEditTaskID);
        }
        setMode(newMode);
    }

    function handleAddTask(name) {
        const id = generateUniqueID();
        // setTasks(tasks.concat({name: name, id: nextID, completed: false}));
        // setNextID(nextID + 1);

        setDoc(doc(db, collectionName, id), {name: name, completed: false, id: id, priority: 0, created: serverTimestamp()});
    }

    function handleToggleShowCompleted() {
        setShowCompleted(!showCompleted);
    }

    // function handleSelectTask(id) {
    //     if (selectedTaskIDs.includes(id)) {
    //         console.error(`Task with id ${id} is already selected.`);
    //         return;
    //     }
    //     setSelectedTaskIDs(selectedTaskIDs.concat(id));
    // }
    //
    // function handleDeselectTask(id) {
    //     setSelectedTaskIDs(selectedTaskIDs.filter(t => t !== id));
    // }

    function handleToggleSelectTask(id) {
        if (selectedTaskIDs.includes(id)) {
            setSelectedTaskIDs(selectedTaskIDs.filter(t => t !== id));
        } else {
            setSelectedTaskIDs(selectedTaskIDs.concat(id));
        }
    }

    function handleDeleteSelectedTasks() {
        // setTasks(tasks.filter(t => !selectedTaskIDs.includes(t.id)));
        selectedTaskIDs.forEach(id => deleteDoc(doc(db, collectionName, id)));
        setSelectedTaskIDs([]);
    }

    function handleDeleteCompletedTasks () {
        let newSelectedTaskIDs = selectedTaskIDs;
        tasks.forEach(t => {
            if (t.completed) {
                deleteDoc(doc(db, collectionName, t.id));
                let index = newSelectedTaskIDs.indexOf(t.id);
                if (index > -1) {
                    newSelectedTaskIDs.splice(index, 1);
                }
            }
        })
        setSelectedTaskIDs(newSelectedTaskIDs);
    }

    function handleClearSelectedTasks() {
        setSelectedTaskIDs([]);
    }

    function handleDeleteID(id) {
        // setTasks(tasks.filter(t => t.id !== id));
        deleteDoc(doc(db, collectionName, id));
        setMode("home");
    }

    function handleBack() {
        if (mode === "edit") {
            setMode("home");
        }
        if (mode === "delete") {
            handleClearSelectedTasks();
            setMode("home");
        }
    }

    function handleSetSortBy(sort) {
        setSortBy(Queries[sort]);
    }

    useEffect(() => {
        document.title = `ToDo`;
    }, []);

    // if ()

  return (
      <div>
          <h1>ToDo</h1>

          <Tools showCompleted={showCompleted} onToggleShowCompleted={handleToggleShowCompleted} mode={mode}
                 onChangeMode={handleChangeMode} onBack={handleBack}/>

          {(mode === "home" || mode === "delete") &&
              <SortBy onChangeSort={handleSetSortBy}/> }

          {/*TODO delete this*/}
          {loading && <h1>loading</h1>}

          {mode !== 'edit' && !loading &&
              <Tasks tasks={tasks} onChangeField={handleChangeField} showCompleted={showCompleted}
                     onToggleSelectTask={handleToggleSelectTask} mode={mode} selectedTaskIDs={selectedTaskIDs}
                     onChangeMode={handleChangeMode}/>
          }

          {mode === 'home' &&
              <AddTask onAddTask={handleAddTask}/>
          }

          {mode === 'delete' &&
              <DeleteTasks tasks={tasks} onToggleSelectTask={handleToggleSelectTask}
                           onDeleteSelectedTasks={handleDeleteSelectedTasks}
                           onDeleteCompletedTasks={handleDeleteCompletedTasks}
                           onClearSelectedTasks={handleClearSelectedTasks}
                           loading={loading}
                           selectedTaskIDs={selectedTaskIDs}/>
          }

          {/*<DeleteModal mode={mode} itemType={"selected"} itemCount={7}/>*/}

          {mode === 'edit' && !loading &&
              <EditTask task={tasks.filter(t => t.id === editTaskID)[0]}
                        onToggleSelectTask={handleToggleSelectTask}
                        mode={mode} selected={selectedTaskIDs.includes(editTaskID)} onChangeField={handleChangeField}
                        onDeleteID={handleDeleteID}/>
          }
      </div>
  );
}

export default App;
