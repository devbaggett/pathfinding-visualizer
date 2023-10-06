import styles from "./TaskItem.module.scss";
import { useState } from 'react';

const TaskItem = (props) => {
    const { task, isCompleted, handleDeleteTask } = props;

    const [isChecked, setIsChecked] = useState<boolean>(!!isCompleted);

    const handleClick = () => {
        setIsChecked(prevState => !prevState);
    };

    const onDelete = () => {
        handleDeleteTask(task.id)
    }

    const { taskItem, completed } = styles;

    return (
        <li className={`${taskItem}${isChecked ? ` ${completed}` : ""}`}>
            {task.name}
            <input type="checkbox" onChange={handleClick} checked={isChecked} />
            <button onClick={onDelete}>Delete</button>
        </li>
    );
};

export default TaskItem;
