import './App.css' 
import NavBar from './components/navBar/NavBar.jsx';
import ProjectList from './components/project/ProjectList.jsx'

function App() {

  return (
  <div className='container'>
    <nav><NavBar/></nav>
      <ProjectList/>

  </div>
  );
}

export default App
