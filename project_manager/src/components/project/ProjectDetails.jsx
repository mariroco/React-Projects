import Pencil from "../../assets/svg/pencil.svg";
import Trash from "../../assets/svg/trash.svg";
import Plus from "../../assets/svg/plus.svg"
import Task from "../task/Task.jsx";
import RoundedButton from "../buttons/RoundedButton.jsx";
import IconButton from "../buttons/IconButton.jsx";
import Popup from "../popup/Popup.jsx";
import { useState, useRef } from "react";

export default function ProjectDetails({projectObj, editProject, deleteThis, deleteTask, addTask, updateTaskStatus}) {
    const [showPopup, setShowPopup]=useState(false);
    const [tasks, setTasks] = useState(projectObj.Tasks);
        
    const iconArray = [Pencil,Trash,Plus];

    function deleteThisTask(taskKey){
        setTasks( deleteTask(taskKey));
    }

    return(
        <>
            <table style={{width: '100%', padding: '3rem', paddingBottom: '1rem'}}>
                <thead>
                    <tr>
                        <td>
                            <p className='ProjectTitle'>{projectObj.name}</p>
                        </td>
                        <td style={{textAlign: 'right'}}>
                            <IconButton 
                                iconUrl={iconArray[1]} 
                                buttonFunction={deleteThis}/>
                            <IconButton 
                                iconUrl={iconArray[0]}
                                buttonFunction={editProject}/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                        {projectObj.date}
                        <hr/>
                        </td>
                    </tr>
                </thead>
                </table>
               
                <table  style={{width: '100%', paddingInline: '3rem'}}>
                <tbody>
                    <tr>
                        <td style={{paddingBottom: '20px'}}>
                            {projectObj.description}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p style={{display:'inline-block', marginInlineEnd:'1rem'}} className='ProjectTitle'>Tasks</p> 
                            <RoundedButton iconUrl={iconArray[2]} text="Add Task" buttonFunction={()=>setShowPopup(true)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {
                                projectObj.Tasks.map((task) => {
                                    return (
                                        <Task 
                                        key={task.key} 
                                        description={task.task} 
                                        taskState={task.status} 
                                        deleteThis={()=>deleteThisTask(task.key)}
                                        onChecked={()=>updateTaskStatus(task.key)}/>
                                    )})
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
            {showPopup && 
                <Popup closePopup={()=> setShowPopup(false)} title="Add new task">
                    <TaskForm btnFunction={addTask} projectKey={projectObj.key} closeForm={()=>setShowPopup(false)}/>
                </Popup>}
            
        </>
    );  
}

function TaskForm({btnFunction, projectKey, closeForm}){
    
    const descriptionRef = useRef(null);

    function handleSubmit(){
        const taskDesc=descriptionRef.current.value;
        if(taskDesc.trim() != ''){
        btnFunction(projectKey, taskDesc);
        closeForm();
        }else{
            alert('Please fill the task description field');
        }
    }

    return(
        <>
        <div style={{width:'100%', textAlign:'center', display:'flex'}}>
            <input 
            ref={descriptionRef}  
            maxLength="60" 
            type='text' 
            placeholder='Write your task here...'
            style={{fontFamily:'"Merriweather", serif', borderRadius:'30px', padding:'.7rem', width:'100%', borderWidth:'1px'}}/>
        </div>
    
        <div style={{textAlign:'right', margin:'.5rem 0rem .5rem 0rem'}}>
        <RoundedButton text='Submit' buttonFunction={handleSubmit}/>
        </div>
        </>
    );
}