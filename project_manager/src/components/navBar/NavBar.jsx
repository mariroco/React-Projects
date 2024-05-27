import EmojiBtn from "../buttons/EmojiButton";
import {Search} from'../../assets/svg/emojis/emojisDirectory.jsx';
import { useRef } from "react";
import './NavBar.css'
import Project from "../project/Project.jsx";

export default function NavBar({projectList, reloadComponent}){
    const searchKeyWord = useRef();

    function findWord(word, text) {
        let _text = text.toLowerCase();
        let _word = word.toLowerCase();
        if(_text.search(_word)!=-1){
            return(true);
        }
    }

    function handleClick(){
        if(searchKeyWord.current.value.trim()!= ''){
            projectList.forEach(Project => {
                if(findWord(searchKeyWord.current.value, Project.name)){
                    Project.isShowing = true;
                }else{
                    Project.isShowing = false;
                }
            });
        }else{
            projectList.forEach(Project => {
                Project.isShowing = true;
            });
        }
        reloadComponent();
    }

    return(
    <div style={{display: 'flex', flexDirection: 'row', width:' fit-content', height: 'fit-content', margin: '1.5rem'}}>
        <EmojiBtn/>
        <div>
            <h1>
                My
                <br/>
                Project Manager
            </h1>
           
        </div>
        <div className="searchBar">
            <input ref={searchKeyWord} className="searchInput" type="text" placeholder="Search..."></input>
            <div className="searchButtonContainer">
            <img className="searchButton" src={Search} onClick={handleClick}/>
            </div>
        </div>
    </div>);
}