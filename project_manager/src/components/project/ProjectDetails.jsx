import Pencil from "../../assets/svg/pencil.svg";
import Trash from "../../assets/svg/trash.svg";
import Plus from "../../assets/svg/plus.svg"
import Task from "../task/Task.jsx";
import RoundedButton from "../buttons/RoundedButton.jsx";
import IconButton from "../buttons/IconButton.jsx";
import Popup from "../popup/Popup.jsx";
import { useState } from "react";

export default function ProjectDetails({projectObj, deleteThisFunction}) {
    const [popupIsShowing, setPopupIsShowing]=useState(false);
    const iconArray = [Pencil,Trash,Plus];
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
                                buttonFunction={deleteThisFunction}/>
                            <IconButton iconUrl={iconArray[0]}/>
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
                            <RoundedButton iconUrl={iconArray[2]} text="Add Task" buttonFunction={()=>setPopupIsShowing(true)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {
                                projectObj.Tasks.map((task) => {
                                    return (
                                        <Task key={task.key} description={task.task} taskState={task.status}/>
                                    )})
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
            {popupIsShowing && 
            <Popup closePopup={()=>setPopupIsShowing(false)}/>}
            
        </>
    );  
}