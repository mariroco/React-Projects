import { useState } from 'react';
import IconButton from '../buttons/IconButton.jsx';
import CloseIcon from '../../assets/svg/close.svg';
import RoundedTextInput from '../inputs/RoundedTextInput.jsx';
import RoundedButton from '../buttons/RoundedButton.jsx';
import './Task.css';

export default function Task({description='Here goes the task description.', taskState=false}){
    const closeIcon = CloseIcon;
    const [taskIsDone, setTaskIsDone] = useState(taskState);

    function handleOnClick(){
        setTaskIsDone((taskIsDone)=>!taskIsDone)
    }

    return(
        <>
            <div style={{marginLeft: '1rem',display: 'block flex'}}>
                <div style={{width:'100%'}}>
                    <p style={taskIsDone ? {textDecorationLine:  'line-through', color:'orangered'}:{}}>{description}</p>
                </div>
                <div style={{textAlign:'center', verticalAlign:'middle'}}>
                    <input className='checkBox' type="checkbox" style={{marginTop: '1rem'}} onClick={handleOnClick} defaultChecked={taskIsDone} /> 
                </div>
                <div style={{marginTop: '.8rem'}}><IconButton iconUrl={closeIcon}/></div>
                
            </div>
            
        </>
    );
}
