import './App.css' 
import NavBar from './components/navBar/NavBar.jsx';

function App() {

  return (
  <div className='container'>
    <nav><NavBar/></nav>
    <div id='sideBar'>sideBar</div>
    <div id='contentArea'>Content here</div>
  </div>
  );
}

export default App
