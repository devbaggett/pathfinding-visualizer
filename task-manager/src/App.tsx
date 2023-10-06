import AddTask from './components/AddTask';
import "./App.css";
import TaskList from './components/TaskList';
import { useState } from 'react';

const TaskItems = [
    {
        id: 1,
        name: "exercise",
        isCompleted: false
    },
    {
        id: 2,
        name: "shopping",
        isCompleted: false
    },
    {
        id: 3,
        name: "walk dogs",
        isCompleted: false
    },
]

const App = () => {
    const [taskItems, setTaskItems] = useState(TaskItems);

    const handleAddTask = (newTask) => {
        setTaskItems(prevState => [...prevState, newTask])
    }

    const handleDeleteTask = (taskId: number) => {
        setTaskItems(prevState => prevState.filter(task => task.id !== taskId));
        // console.log(newTaskList);
        // setTaskItems(prevState => )
    }

    return (
        <div className="task-manager">
            <h1>Task Manager</h1>
            <AddTask handleAddTask={handleAddTask} />
            <TaskList list={taskItems} handleDeleteTask={handleDeleteTask} />
        </div>
    );
};

export default App;
