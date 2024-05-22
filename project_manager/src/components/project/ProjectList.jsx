import Project from './Project.jsx';
import RoundedButton from '../buttons/RoundedButton.jsx';
import ProjectDetails from './ProjectDetails.jsx';
import {useState} from 'react';

//Dummy data
import { dummyProjects } from "../../dummyData/dummyProjects.jsx";

export default function ProjectList(){
    //Usar un useref para manipular datos del arreglo de projectos
    const [projectList, setProjectList] = useState(dummyProjects);
    const [selectedProject, setSelectedProject] = useState(0);

    console.log(projectList);
  
    return(
        <>
        <div id='sideBar'>
            <div className='buttonParentDiv'>
                <div className='createProjectButton'>
                    <RoundedButton text='Create a new project' hoverColor='gray' />
                </div>
                <div className="custom-scrollbar" id='ProjectList'>

                {
                    dummyProjects.map((project) => {
                    return (
                         <Project projectName={project.name} key={project.key} clickFunction={()=>setSelectedProject(project.key)} selected={project.key===selectedProject ? true:false}/>
                    );})
                }
                    
            </div>
            </div>
            
        </div>
        <div id='contentArea'>
            <ProjectDetails projectObj={projectList[selectedProject]}/>
                
        </div>
        </>
    );
}