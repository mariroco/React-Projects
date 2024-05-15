import EmojiBtn from "../buttons/EmojiButton";
import {Search} from'../../assets/svg/emojis/emojisDirectory.jsx';
import './NavBar.css'
export default function NavBar(){
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
            <input className="searchInput" type="text" placeholder="Search..."></input>
            <div className="searchButtonContainer">
            <img className="searchButton" src={Search}/>
            </div>
        </div>
    </div>);
}