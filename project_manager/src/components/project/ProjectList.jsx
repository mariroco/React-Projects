import Project from './Project.jsx';
import RoundedButton from '../buttons/RoundedButton.jsx';
import ProjectDetails from './ProjectDetails.jsx';
import WelcomePage from '../welcomePage/WelcomePage.jsx';
import Popup from '../popup/Popup.jsx';

import {useState, useRef} from 'react';

export default function ProjectList({projectList}){
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showEditPopup,setShowEditPopup]=useState(false);

    function getProjectIndexByKey(projectKey){
        for(var i=0; i<projectList.length; i++){
            if(projectList[i].key == projectKey){
                return(i);
            }}
    }

    function setSelectedProjectIndexByKey(projectKey){
        for(var i=0; i<projectList.length; i++){
            if(projectList[i].key == projectKey){
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
        let newProjectKey;
        if(projectList.length==0){
            newProjectKey = 0;
        }else{
            newProjectKey = projectList[projectList.length-1].key+1;
        }
        

        console.log(newProjectKey);

        const newProject =
            {
                "key":newProjectKey,
                "name": name,
                "date": date,
                "description": description,
                "isShowing": true,
                "Tasks": []
            };

            projectList.push(newProject);
    }

    function deleteProjectFromListByKey(projectKey){
        const tempArray = [];
        for(var i=0; i<projectList.length; i++){
            if(projectList[i].key == projectKey){
                projectList.splice(i,1);
            }
        }
        console.log(projectList);
        setSelectedProjectIndex(null);
    }

    function updateProject(project){
        const prevProject = projectList[selectedProjectIndex];
        const updatedProject = {
            "key":prevProject.key,
            "name":project.name,
            "date":project.date,
            "description":project.description,
            "isShowing": true,
            "Tasks":prevProject.Tasks
        };
        projectList[selectedProjectIndex] = updatedProject;
    }

    function addProjectTask(projectKey, description){
        const taskList = projectList[selectedProjectIndex].Tasks;

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

        return (projectList[selectedProjectIndex].Tasks.push(newTask));
    }

    function deleteProjectTask(taskKey){
        const tempTasks =[];
        let taskIndex;
        for(var i=0; i<projectList[selectedProjectIndex].Tasks.length;i++){
            if(projectList[selectedProjectIndex].Tasks[i].key==taskKey){
                taskIndex = i;
            }
        }

        for(var i=0; i<projectList[selectedProjectIndex].Tasks.length;i++){
            if(taskIndex != i){
                tempTasks.push(projectList[selectedProjectIndex].Tasks[i])
            }
        }

        projectList[selectedProjectIndex].Tasks.splice(taskIndex,1);
        return(tempTasks);

        
    }

    function updateProjectTaskStatus(taskKey){
        projectList[selectedProjectIndex].Tasks.forEach(element => {
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
                    projectList.map((project) => {
                        if(project.isShowing){
                            return (
                                <Project 
                                projectName={project.name} 
                                key={'prj'+project.key} 
                                clickFunction={()=>setSelectedProjectIndexByKey(project.key)}
                                selected={()=> isThisProjectSelected(project.key)}/>
                           );}
                        }
                    )
                }
                    
            </div>
            </div>
            
        </div>
        <div id='contentArea'>
            {selectedProjectIndex != undefined && projectList[selectedProjectIndex].isShowing == true ?
            <ProjectDetails 
                projectObj={projectList[selectedProjectIndex]}
                editProject={()=> setShowEditPopup(true)}
                taskList={projectList[selectedProjectIndex].Tasks}
                deleteThis={()=>deleteProjectFromListByKey(projectList[selectedProjectIndex].key)}
                deleteTask={deleteProjectTask}
                addTask={addProjectTask}
                updateTaskStatus={updateProjectTaskStatus}
                /> 
            : <WelcomePage/>
            }
                
        </div>
        {showEditPopup && <Popup closePopup={()=> setShowEditPopup(false)} title='Edit project' ><EditProjectForm btnFunction={updateProject} closeForm={()=>setShowEditPopup(false)} project={projectList[selectedProjectIndex]}/></Popup>}
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