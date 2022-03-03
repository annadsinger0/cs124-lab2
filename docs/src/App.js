import logo from './logo.svg';
import './App.css';
import {Fragment, useEffect} from "react";
import checkboxEmpty from "./assets/checkboxEmpty.png";
import checkboxFull from "./assets/checkboxFull.png";
import trashcan from "./assets/trashcan.png";
import Tools from "./Tools";
import Tasks from "./Tasks";
import AddTask from "./AddTask";
import {useState} from "react";
import DeleteTasks from "./DeleteTasks";
import Task from "./Task";
import EditTask from "./EditTask";
import DeleteModal from "./DeleteModal";



function App(props) {
    const [tasks, setTasks] = useState(props.initialData);
    const [showCompleted, setShowCompleted] = useState(true);
    const [nextID, setNextID] = useState(10); //TODO - fix initial state
    const [selectedTaskIDs, setSelectedTaskIDs] = useState([]);
    // TODO - set appropriately once we figure out nav
    // modes: home, delete, edit
    const [mode, setMode] = useState("home");

    const [editTaskID, setEditTaskID] = useState(1);

    function handleChangeField(id, changeField, value) {
        setTasks(tasks.map(task => task.id === id ?
            {...task, [changeField]: value} : task ));
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
        setTasks(tasks.concat({name: name, id: nextID, completed: false}));
        setNextID(nextID + 1);
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
        setTasks(tasks.filter(t => !selectedTaskIDs.includes(t.id)));
        setSelectedTaskIDs([]);
    }

    function handleDeleteCompletedTasks () {
        let newTasks = [];
        let newSelectedTaskIDs = selectedTaskIDs;
        tasks.forEach(t => {
            if (!t.completed) {
                newTasks = newTasks.concat(t);
            }
            else { // if (t.completed)
                let index = newSelectedTaskIDs.indexOf(t.id);
                if (index > -1) {
                    newSelectedTaskIDs.splice(index, 1);
                }
            }
        })
        setTasks(newTasks);
        setSelectedTaskIDs(newSelectedTaskIDs);
    }

    function handleClearSelectedTasks() {
        setSelectedTaskIDs([]);
    }

    function handleDeleteID(id) {
        setTasks(tasks.filter(t => t.id !== id));
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

    useEffect(() => {
        document.title = `ToDo`;
    }, []);

  return (
      <div>
          <h1>ToDo</h1>

          <Tools showCompleted={showCompleted} onToggleShowCompleted={handleToggleShowCompleted} mode={mode}
                 onChangeMode={handleChangeMode} onBack={handleBack}/>

          {mode !== 'edit' &&
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
                           selectedTaskIDs={selectedTaskIDs}/>
          }

          {/*<DeleteModal mode={mode} itemType={"selected"} itemCount={7}/>*/}

          {mode === 'edit' &&
              <EditTask task={tasks.filter(t => t.id === editTaskID)[0]}
                        onToggleSelectTask={handleToggleSelectTask}
                        mode={mode} selected={selectedTaskIDs.includes(editTaskID)} onChangeField={handleChangeField}
                        onDeleteID={handleDeleteID}/>
          }
      </div>
  );
}

export default App;
