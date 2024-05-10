import { useState, useRef } from "react";
import {Happy,Relaxed,Sad,Winking} from'../../assets/svg/emojis/emojisDirectory.jsx';
import './EmojiButton.css';

export default function EmojiBtn(){
    const emojiArr = [Happy,Relaxed,Sad,Winking];
    const [currentEmoji, setEmoji] = useState(0);
     function handleClick(){

        setEmoji((prevEmoji) => { 
            if(prevEmoji >= emojiArr.length-1){
                return 0;
            }else{
                return prevEmoji+1;
            }
            
        });
    }

    return(
        <>
            <div style={{mask: `url(${emojiArr[currentEmoji]}) 100% 100% / contain no-repeat`}} className="emoji" onClick={handleClick}/>
        </>
    );  
}