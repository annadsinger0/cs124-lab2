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

const initialData = [
    {name: "TaskTaskTasTaskTask 1", id: 1, completed: false},
    {name: "Task 2", id: 2, completed: true},
]

function App() {
    const [tasks, setTasks] = useState(initialData);
    const [showCompleted, setShowCompleted] = useState(true);
    const [nextID, setNextID] = useState(10); //TODO - fix initial state
    const [selectedTaskIDs, setSelectedTaskIDs] = useState([]);

    function handleChangeList(id, changeField, value) {
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

    function handleSelectTask(id) {
        if (selectedTaskIDs.includes(id)) {
            console.error(`Task with id ${id} is already selected.`);
            return;
        }
        setSelectedTaskIDs(selectedTaskIDs.concat(id));
    }

    function handleDeselectTask(id) {
        setSelectedTaskIDs(selectedTaskIDs.filter(t => t !== id));
    }

    function handleDeleteSelectedTasks() {
        setTasks(tasks.filter(t => !selectedTaskIDs.includes(t.id)));
        setSelectedTaskIDs([]);
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
          <Tasks tasks={tasks} onChangeField={handleChangeList} showCompleted={showCompleted}/>
          {/*<AddTask onAddTask={handleAddTask}/>*/}
          <DeleteTasks tasks={tasks} onSelectTask={handleSelectTask} onDeselectTask={handleDeselectTask}
                       onDeleteSelectedTask={handleDeleteSelectedTasks}
                       onClearSelectedTasks={handleClearSelectedTasks}/>
      </div>
  );
}

export default App;
