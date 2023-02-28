import { Trash } from 'phosphor-react';
import styles from './Task.module.css';


export function Task({ idTask, comment, taskCompleted, onDeleteTask, onChangeTaskToCompleted }){
    function handleDeleteTask() {
        onDeleteTask(idTask)
    }

    return (
        <div className={styles.tasks}> 
            <div className={styles.descriptionTask}>
                <input type="checkbox" value="" checked={taskCompleted} onClick={() => onChangeTaskToCompleted(idTask)}></input>
                <p>{comment}</p>
            </div>
            <button onClick={handleDeleteTask} title='Deletar a tarefa'>
                <Trash size={24}/>    
            </button> 
        </div>
    )
}