import './Project.css';
export default function Task(){
    const dummyProjects = []
    for (let i=0;i<30;i++) {
        dummyProjects.push(<p key={'prj'+i} className='Project'>Dummy Project {i+1}</p>);
    };
    return(
        dummyProjects
    );
}