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

const initialData = [
    {name: "1", id: 1, completed: false},
    {name: "2", id: 2, completed: true},
    {name: "3", id: 3, completed: false},
    {name: "4", id: 4, completed: true},
    {name: "5", id: 5, completed: false},
]

// TODO list - navigaition, edit mode, delete confirmation

function App() {
    const [tasks, setTasks] = useState(initialData);
    const [showCompleted, setShowCompleted] = useState(true);
    const [nextID, setNextID] = useState(10); //TODO - fix initial state
    const [selectedTaskIDs, setSelectedTaskIDs] = useState([]);
    // TODO - set appropriately once we figure out nav
    // modes: home, delete, edit
    const [mode, setMode] = useState("edit");

    function handleChangeField(id, changeField, value) {
        setTasks(tasks.map(task => task.id === id ?
            {...task, [changeField]: value} : task ));
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

    useEffect(() => {
        document.title = `ToDo`;
    }, []);




  return (
      <div>
          <h1>ToDo</h1>

          <Tools showCompleted={showCompleted} onToggleShowCompleted={handleToggleShowCompleted}/>
          {/*<Tasks tasks={tasks} onChangeField={handleChangeField} showCompleted={showCompleted}*/}
          {/*       onToggleSelectTask={handleToggleSelectTask} mode={mode} selectedTaskIDs={selectedTaskIDs}/>*/}
          {/*/!*<AddTask onAddTask={handleAddTask}/>*!/*/}
          {/*<DeleteTasks tasks={tasks} onToggleSelectTask={handleToggleSelectTask}*/}
          {/*             onDeleteSelectedTasks={handleDeleteSelectedTasks}*/}
          {/*             onDeleteCompletedTasks={handleDeleteCompletedTasks}*/}
          {/*             onClearSelectedTasks={handleClearSelectedTasks}*/}
          {/*             selectedTaskIDs={selectedTaskIDs} />*/}
          <div  id="todolist"> <Task task={tasks[0]} onChangeField={handleChangeField} key={tasks[0].id}
                      onToggleSelectTask={handleToggleSelectTask}
                      mode={mode} selected={selectedTaskIDs.includes(tasks[0].id)}/> </div>
      </div>
  );
}

export default App;
