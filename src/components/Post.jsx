import { useState, useEffect } from 'react'

import clipboard from '../assets/Clipboard.png'
import styles from './Post.module.css'

import { Task } from './Task'

export function Post() {
    const [tasks, setTasks ] = useState([])
    const [ taskCompletedCount, setTaskCompletedCount ] = useState(0)
    
    const [ newTask, setNewTask ] = useState({
        id: String(new Date()),
        task: '',
        taskCompleted: false
    })


    function handleNewCommentChange() {
        event.target.setCustomValidity("")
        setNewTask({...newTask, task: event.target.value})
    }

    function handleCreateNewComment() {
        event.preventDefault()
        setTasks(state => [...state, newTask])

        setNewTask({
            id: String(new Date()),
            task: '',
            taskCompleted: false
        })
    }

    function deleteTask(taskToDeleteId){
        const tasksWithoutDeletedOne = tasks.filter(task => {
            return task.id !== taskToDeleteId
        })

        setTasks(tasksWithoutDeletedOne)
    }

    function changeTaskToCompleted(taskToCompleteId){
        const newArrTask = [...tasks]

        newArrTask.map(task => {
            if(task.id === taskToCompleteId){
                task.taskCompleted = !task.taskCompleted

            }
        })
        
        setTasks(newArrTask)
    }

    function taskCompletedCounter(){
        const newArrTask = [...tasks]

        setTaskCompletedCount(0)

        newArrTask.map(task => {
            if(task.taskCompleted) setTaskCompletedCount((state) => state + 1) 
        })
    }

    function handleNewCommentInvalid() {
        event.target.setCustomValidity("Esse campo é obrigatório!")
    }
    
    useEffect(() => {
        taskCompletedCounter()
    }, [tasks])

    const isNewCommentInputEmpyt = newTask.task.length === 0

    return (
        <article className={styles.post}>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <textarea 
                    value={newTask.task}
                    name='task'
                    placeholder='Adicione uma nova tarefa'
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <button 
                    type="submit" disabled={isNewCommentInputEmpyt}
                >
                    Publicar
                </button>
            </form>

            <div className={styles.taskStatus}>
                <div className={styles.taskDivAdd}>
                    <p className={styles.taskAdd}>
                        Tarefas criadas
                    </p>
                    <p className={styles.counterTask}>{tasks.length}</p>
                </div>
                <div className={styles.taskDivAdd}>
                    <p className={styles.taskCompleted}>
                        Concluídas
                    </p>
                    {tasks.length === 0 ?
                        <p className={styles.counterTaskCompleted}>{tasks.length}</p>
                    :
                        <p className={styles.counterTaskCompleted}>{taskCompletedCount} de {tasks.length}</p>
                    }   
                </div>
            </div>


            <div className={tasks.length === 0 ? styles.taskListEmpty : styles.taskList}>
                {tasks.length === 0 ?
                    <>
                        <img src={clipboard} width={56} height={56} alt="clipboard de tarefas" />

                        <h1 className={styles.taskListEmptyText}>Você ainda não tem tarefas cadastradas <br />
                            Crie tarefas e organize seus itens a fazer</h1>
                    </>
                    :
                    tasks.map(comment => {
                        return (
                            <Task
                                key={comment.id}
                                idTask={comment.id}
                                comment={comment.task}
                                taskCompleted={comment.taskCompleted}
                                onDeleteTask={deleteTask}
                                onChangeTaskToCompleted={changeTaskToCompleted}
                            />
                        )
                    })
                }
            </div>

        </article>
    )
}