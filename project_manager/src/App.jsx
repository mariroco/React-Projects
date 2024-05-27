import './App.css' 
import NavBar from './components/navBar/NavBar.jsx';
import ProjectList from './components/project/ProjectList.jsx'
import { dummyProjects } from './dummyData/dummyProjects.jsx';
import { useRef, useState } from 'react';
function App() {
  const [reloadComponent, setReloadComponent] = useState(true);
  const projectList = useRef(dummyProjects);

  function _reloadComponent(){
    setReloadComponent((updateComponent)=>!updateComponent);
  }

  return (
  <div className='container'>
    <nav><NavBar projectList={projectList.current} reloadComponent={_reloadComponent}/></nav>
      <ProjectList projectList={projectList.current}/>

  </div>
  );
}

export default App
