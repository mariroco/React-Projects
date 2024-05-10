import { useState } from "react";
import {Happy,Relaxed,Sad,Winking} from'../../assets/svg/emojis/emojisDirectory.jsx';

export default function EmojiBtn(){
    const emojiArr = [Happy,Relaxed,Sad,Winking];
    const [currentEmoji, setEmoji] = useState(0);
    function handleClick(){
        //setEmoji(() => );
        console.log('Yay!');
    }

    return(
            <button onClick={handleClick}>
                {emojiArr[currentEmoji]}
            </button>
    );  
}