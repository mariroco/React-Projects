
import { useState } from "react";

export default function IconButton({iconUrl='../../../public/management.svg', iconColor='black', hoverColor='orangered', clickColor='orange', buttonFunction=null}){
    const[isHovered, setIsHovered] = useState(iconColor);

    function handleOnMouseEnter(){
        setIsHovered(hoverColor);
    }

    function handleOnMouseLeave(){
        setIsHovered(iconColor);
    }

    function handleOnMouseDown(){
        setIsHovered(clickColor);
    }


    function handleOnClick(){
        
        if(buttonFunction==null){
            console.log("'buttonFunction' prop is undefined on the <IconButton/> component. This is a default function.");
        }else{
            buttonFunction();
        }
    }

    

    return(
        <>
        <div 
        style={{
            display: 'flex', 
            flexDirection: 'row', 
            width:'1.5rem', 
            height:'1.5rem', 
            float:'right', 
            marginInline:'.5rem',
            transition: "all .5s ease",
            WebkitTransition: "all .5s ease",
            MozTransition: "all .5s ease",
            transform: isHovered == clickColor ? 'scale(0.9)': 'scale(1)',
        }} 
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onMouseDown={handleOnMouseDown}
        onMouseUp={handleOnMouseEnter}
        onClick={handleOnClick}>
            <div style={{mask:`url(${iconUrl}) 0 0 / contain no-repeat`, width:'100%', backgroundColor:isHovered}}/>
        </div>
        </>
    );
}