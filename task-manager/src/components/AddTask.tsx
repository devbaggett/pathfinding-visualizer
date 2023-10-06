import styles from "./AddTask.module.scss";
import { useRef, useState } from 'react';

const AddTask = (props) => {
    const { handleAddTask } = props;

    // const [taskToAdd, setTaskToAdd] = useState("");
    const taskInputRef = useRef<HTMLInputElement | null>(null);

    // const handleInputChange = (event) => {
    //     setTaskToAdd(event.target.value);
    // }

    const onAddTask = () => {
        // handleAddTask({
        //     name: taskToAdd,
        //     isCompleted: false
        // });
        // setTaskToAdd("");
        const taskValue = taskInputRef.current?.value;
        handleAddTask({
            id: Math.random(),
            name: taskValue,
            isCompleted: false
        })
        taskInputRef.current!.value = "";
        console.log("taskvalue: ", taskValue);
    };

    const { input, button } = styles;

    return (
        <div>
            <label htmlFor="add-task"></label>
            <input
                className={input}
                type="text"
                id="add-task"
                placeholder="Task"
                // value={taskToAdd}
                ref={taskInputRef}
                // onChange={handleInputChange}
            />
            <button className={button} onClick={onAddTask}>Add</button>
        </div>
    );
};

export default AddTask;
