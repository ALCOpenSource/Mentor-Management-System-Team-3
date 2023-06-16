import { useState } from 'react';

function AssignTask() {
   // const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');


    return (
        <section>
            <h1>New Task</h1>
            <form>
                <label className='title'>Title</label>
                <input
                    className='title-input'
                    type="text"
                    placeholder="Enter a title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={32}
                />
                <span className='title-input-desc'>The title must contain a maximum of 32 characters</span>
                <label className='textarea-label'>Details</label>
                <textarea
                    placeholder="Enter task details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                >
                </textarea>
                <button type='submit' className='create-task-btn'>Create Task</button>
            </form>
        </section>
    )
}

export default AssignTask;
