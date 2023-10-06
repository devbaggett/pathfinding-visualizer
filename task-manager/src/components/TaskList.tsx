import TaskItem from './TaskItem';
import styles from "./TaskList.module.scss";

const TaskList = (props) => {
    const { list, handleDeleteTask } = props;

    const { taskList } = styles;

    return (
        <ul className={taskList}>
            {list.map(item => {
                return (
                    <TaskItem
                        key={item.id}
                        task={item}
                        isComplete={item.isCompleted}
                        handleDeleteTask={handleDeleteTask}
                    />
                );
            })}
        </ul>
    );
};

export default TaskList;
