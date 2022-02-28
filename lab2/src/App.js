import logo from './logo.svg';
import './App.css';
import {Fragment} from "react";
import checkboxEmpty from "./assets/checkboxEmpty.png";
import checkboxFull from "./assets/checkboxFull.png";
import trashcan from "./assets/trashcan.png";
import Tools from "./Tools";
import Tasks from "./Tasks";
import AddTask from "./AddTask";
import {useState} from "react";

const initialData = [
    {name: "TaskTaskTasTaskTask 1", id: 1, completed: false},
    {name: "Task 2", id: 2, completed: true},
]

function App() {
    const [list, setList] = useState(initialData);

    function handleChangeList(id, changeField, value) {
        setList(list.map(task => task.id === id ?
            {...task, [changeField]: value} : task ));
        // setData(data.map(p => (p.id === personId ? {...p, [field] : value} : p)));
    }

    function handleAddTask(name) {
        setList(list.concat({name: name, id: 6, completed: false}));
    }


  return (
      <Fragment>
      <head>
        <title>ToDo</title>
        <link rel="stylesheet" href="style.css"/>
      </head>
  <body>

  <h1>ToDo</h1>

  <Tools />

    <Tasks tasks={list} onChangeField={handleChangeList}/>

  <AddTask onAddTask={handleAddTask}/>


  </body>
      </Fragment>);
}

export default App;
