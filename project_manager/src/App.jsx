import './App.css' 
import NavBar from './components/navBar/NavBar.jsx';
import ProjectDetails from './components/project/ProjectDetails.jsx';
import ProjectList from './components/project/ProjectList.jsx'

function App() {

  return (
  <div className='container'>
    <nav><NavBar/></nav>
    <div id='sideBar'>
      <ProjectList/>
    </div>
    <div id='contentArea'>
      <ProjectDetails/>
    </div>
  </div>
  );
}

export default App
