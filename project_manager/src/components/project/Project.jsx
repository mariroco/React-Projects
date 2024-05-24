import { useState } from 'react';
import './Project.css';

export default function Project({projectName, clickFunction=null, selected}){

    function handleProject() {
        if(clickFunction != null){
            clickFunction();
        }else{
            console.log(projectName+"'s 'clickFunction' prop is undefined");
        }
    }


    return(
        <p className='Project' style={selected() ? {transform:'scale(1.1)', fontWeight:'bold',marginInline:'4rem'}:{}} onClick={handleProject}>{projectName}</p>     
    );
}
