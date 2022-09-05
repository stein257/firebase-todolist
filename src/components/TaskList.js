import {MdAdd, MdCheck} from "react-icons/md";
import * as React from "react";
import {useRecoilValue} from "recoil";
import {tasksState} from "../recoil/atoms";
import {useState} from "react";
import {doc, setDoc} from "firebase/firestore";


function Task({text, uid, firestore}) {
    const tasks = useRecoilValue(tasksState);

    const deleteTask = () => {
        const newTasks = tasks.filter(taskText => taskText !== text);
        setDoc(doc(firestore, "users", uid), {
            tasks: newTasks
        }).then((value) => {
            console.log(value)
        })
    }

    return (
        <div className="task">
            <span>
                {text}
            </span>
            <span onClick={deleteTask}>
                <MdCheck/>
            </span>
        </div>
    );
}

function TaskList({uid, firestore}) {
    const tasks = useRecoilValue(tasksState);
    const [formValue, setFormValue] = useState('');

    const addTask = (e) => {
        e.preventDefault();
        const newTasks = [...tasks, formValue];
        setDoc(doc(firestore, "users", uid), {
            tasks: newTasks
        }).then((value) => {
            console.log(value)
        })
        setFormValue("");
    }

    return <>
        <div className="tasks-container">
            {tasks && tasks.map((task) => {
                return <Task text={task} key={task} firestore={firestore} uid={uid}/>
            })}
        </div>

        <form className="add-task" onSubmit={addTask}>
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Write a Task..."/>
            <button type="submit" disabled={!formValue}>
                <MdAdd/>
            </button>
        </form>
    </>;
}

export default TaskList;