import Project from './Project.jsx';
import RoundedButton from '../buttons/RoundedButton.jsx';
import ProjectDetails from './ProjectDetails.jsx';
import WelcomePage from '../welcomePage/WelcomePage.jsx';
import Popup from '../popup/Popup.jsx';

import {useState, useRef} from 'react';

//Dummy data
import { dummyProjects } from "../../dummyData/dummyProjects.jsx";

export default function ProjectList(){
    //Usar un useref para manipular datos del arreglo de projectos
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const _projectList = useRef(dummyProjects);
    //console.log(_projectList.current);
    
    function getProjectIndexByKey(projectKey){
        for(var i=0; i<_projectList.current.length; i++){
            if(_projectList.current[i].key == projectKey){
                return(i);
            }}
    }

    function setSelectedProjectIndexByKey(projectKey){
        for(var i=0; i<_projectList.current.length; i++){
            if(_projectList.current[i].key == projectKey){
                if(selectedProjectIndex === i){
                    setSelectedProjectIndex(null);
                }else{
                    setSelectedProjectIndex(i);
                    return(i);
                }
            }
        }    
      
    }

    function addNewProjectToList(name, date, description){
        const newProjectKey = () => {
            if(_projectList.current.length==0){
                return(0);
            }else{
                return (_projectList.current[_projectList.current.length-1].key+1);
            }
        };
        const newProject =
            {
                "key":newProjectKey,
                "name": name,
                "date": date,
                "description": description,
                "Tasks": []
            };

            _projectList.current.push(newProject);
    }

    function deleteProjectFromListByKey(projectKey){
        
        const tempArray = [];
        for(var i=0; i<_projectList.current.length; i++){
            if(_projectList.current[i].key != projectKey){
                tempArray.push(_projectList.current[i]);
            }
        }
        console.log(tempArray);
        _projectList.current= tempArray;
        setSelectedProjectIndex(null);
    }

    function isThisProjectSelected(projectKey){
        return(getProjectIndexByKey(projectKey) === selectedProjectIndex);
    }

    return(
        <>
        <div id='sideBar'>
            <div className='buttonParentDiv'>
                <div className='createProjectButton'>
                    <RoundedButton text='Create a new project' hoverColor='gray' buttonFunction={()=>setShowPopup(true)} />
                </div>
                <div className="custom-scrollbar" id='ProjectList'>
                {
                    _projectList.current.map((project) => {
                    return (
                         <Project 
                         projectName={project.name} 
                         key={'prj'+project.key} 
                         clickFunction={()=>setSelectedProjectIndexByKey(project.key)}
                         selected={()=> isThisProjectSelected(project.key)}/>
                    );})
                }
                    
            </div>
            </div>
            
        </div>
        <div id='contentArea'>
            {selectedProjectIndex != undefined ? 
            <ProjectDetails 
            projectObj={_projectList.current[selectedProjectIndex]}
            deleteThisFunction={()=>deleteProjectFromListByKey(_projectList.current[selectedProjectIndex].key)}/> 
            : <WelcomePage/>
            }
                
        </div>
        {showPopup && <Popup closePopup={()=> setShowPopup(false)} title='Create a new project' ><ProjectForm btnFunction={addNewProjectToList} closeForm={()=>setShowPopup(false)}/></Popup>}
        </>
    );
}

function ProjectForm({btnFunction, closeForm}){
    const [usedChars, setUsedChars] = useState(0);

    const nameRef = useRef(null);
    const dateRef =useRef(null);
    const descriptionRef = useRef(null);

    function handleSubmit(){
        if(nameRef.current.value.trim() != '' && dateRef.current.value.trim() != '' && descriptionRef.current.value.trim() != ''){
            btnFunction(nameRef.current.value.trim(),dateRef.current.value.trim(),descriptionRef.current.value.trim());
            closeForm();
        }else{
            alert('Please check if there are any empty datafields');
        }
    }

    function handleOnChange(e){
        setUsedChars(e.target.value.length);
    }

    return(
    <>
    <div style={{width:'100%', textAlign:'center', display:'flex'}}>
        <input 
        ref={nameRef}  
        maxLength="60" 
        type='text' 
        placeholder='Project name' 
        onChange={(e)=>handleOnChange(e)}
        style={{fontFamily:'"Merriweather", serif', borderRadius:'30px', padding:'.7rem', width:'100%', borderWidth:'1px'}}/>
    </div>
    <p style={{float:'right', fontSize:'10px', color:'orangered'}}>Used {usedChars} out of 60 characters.</p>
    <div style={{width:'100%', textAlign:'right', display:'flex', marginBottom:'1rem'}}>
    <input ref={dateRef} type='date' style={{fontFamily:'"Merriweather", serif',borderRadius:'30px', padding:'.7rem', width:'100%', borderWidth:'1px', borderColor:'orange'}}/>
    </div>
    <div style={{width:'100%', textAlign:'center', display:'flex', marginBottom:'.5rem'}}>
        <textarea ref={descriptionRef} placeholder='Project description' style={{fontFamily:'"Merriweather", serif',borderRadius:'25px', padding:'1rem', width:'100%', resize:'none', height:'6rem'}}/>
    </div>
    <div style={{textAlign:'right', margin:'.5rem 0rem .5rem 0rem'}}>
    <RoundedButton text='Submit' buttonFunction={handleSubmit}/>
    </div>
    </>);
}