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
    const [showEditPopup,setShowEditPopup]=useState(false);

    const _projectList = useRef(dummyProjects);

    
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
        _projectList.current= tempArray;
        setSelectedProjectIndex(null);
    }

    function updateProject(project){
        const prevProject = _projectList.current[selectedProjectIndex];
        const updatedProject = {
            "key":prevProject.key,
            "name":project.name,
            "date":project.date,
            "description":project.description,
            "Tasks":prevProject.Tasks
        };
        _projectList.current[selectedProjectIndex] = updatedProject;
    }

    function addProjectTask(projectKey, description){
        const taskList = _projectList.current[selectedProjectIndex].Tasks;

        let lastTaskKey;
        if(taskList.length>0){
            lastTaskKey = taskList[taskList.length-1].key2; 
        }else{
            lastTaskKey = 0;
        }
        
        const newTask = {
            "key": projectKey+'pr'+(parseInt(lastTaskKey)+1)+'t',
            "key2": lastTaskKey+1,
            "task":description,
            "status":false
        };

        return (_projectList.current[selectedProjectIndex].Tasks.push(newTask));
    }

    function deleteProjectTask(taskKey){
        const tempTasks =[];
        let taskIndex;
        for(var i=0; i<_projectList.current[selectedProjectIndex].Tasks.length;i++){
            if(_projectList.current[selectedProjectIndex].Tasks[i].key==taskKey){
                taskIndex = i;
            }
        }

        for(var i=0; i<_projectList.current[selectedProjectIndex].Tasks.length;i++){
            if(taskIndex != i){
                tempTasks.push(_projectList.current[selectedProjectIndex].Tasks[i])
            }
        }

        _projectList.current[selectedProjectIndex].Tasks.splice(taskIndex,1);
        return(tempTasks);

        
    }

    function updateProjectTaskStatus(taskKey){
        _projectList.current[selectedProjectIndex].Tasks.forEach(element => {
            if(element.key == taskKey){
                element.status = !element.status;
            }
        });

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
                editProject={()=> setShowEditPopup(true)}
                taskList={_projectList.current[selectedProjectIndex].Tasks}
                deleteThis={()=>deleteProjectFromListByKey(_projectList.current[selectedProjectIndex].key)}
                deleteTask={deleteProjectTask}
                addTask={addProjectTask}
                updateTaskStatus={updateProjectTaskStatus}
                /> 
            : <WelcomePage/>
            }
                
        </div>
        {showEditPopup && <Popup closePopup={()=> setShowEditPopup(false)} title='Edit project' ><EditProjectForm btnFunction={updateProject} closeForm={()=>setShowEditPopup(false)} project={_projectList.current[selectedProjectIndex]}/></Popup>}
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

function EditProjectForm({btnFunction, closeForm, project}){
    const [usedChars, setUsedChars] = useState(project.name.length);
    const nameRef = useRef(project.name);
    const dateRef = useRef(project.date);
    const descriptionRef = useRef(project.description);

    function handleSubmit(){
        if(nameRef.current.value.trim() != '' && dateRef.current.value.trim() != '' && descriptionRef.current.value.trim() != ''){
             const project = {
                "name": nameRef.current.value,
                "date": dateRef.current.value,
                "description":descriptionRef.current.value 
             }
            btnFunction(project);
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
        defaultValue={project.name}
        maxLength="60" 
        type='text' 
        placeholder='Project name' 
        onChange={(e)=>handleOnChange(e)}
        style={{fontFamily:'"Merriweather", serif', borderRadius:'30px', padding:'.7rem', width:'100%', borderWidth:'1px'}}/>
    </div>
    <p style={{float:'right', fontSize:'10px', color:'orangered'}}>Used {usedChars} out of 60 characters.</p>


    <div style={{width:'100%', textAlign:'right', display:'flex', marginBottom:'1rem'}}>
    <input ref={dateRef} defaultValue={project.date} type='date' style={{fontFamily:'"Merriweather", serif',borderRadius:'30px', padding:'.7rem', width:'100%', borderWidth:'1px', borderColor:'orange'}}/>
    </div>


    <div style={{width:'100%', textAlign:'center', display:'flex', marginBottom:'.5rem'}}>
        <textarea ref={descriptionRef} defaultValue={project.description} placeholder='Project description' style={{fontFamily:'"Merriweather", serif',borderRadius:'25px', padding:'1rem', width:'100%', resize:'none', height:'6rem'}}/>
    </div>


    <div style={{textAlign:'right', margin:'.5rem 0rem .5rem 0rem'}}>
    <RoundedButton text='Submit' buttonFunction={handleSubmit}/>
    </div>
    </>);
}