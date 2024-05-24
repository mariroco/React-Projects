import { useState } from "react";

export default function RoundedButton({
    iconUrl=null, 
    iconColor=null, 
    text='Rounded Button', 
    backgroundColor='black', 
    textcolor='white', 
    hoverColor='orangered', 
    clickColor='orange', 
    buttonFunction=undefined}){    

    const[isHovered, setIsHovered] = useState(backgroundColor);

    function handleOnMouseEnter(){
        setIsHovered(hoverColor);
    }

    function handleOnMouseLeave(){
        setIsHovered(backgroundColor);
    }

    function handleOnMouseDown(){
        setIsHovered(clickColor);
    }

    function handleClick(){
        if(buttonFunction!=undefined){
            buttonFunction();
        }else{
            console.log("'buttonFunction' prop is undefined on the <RoundedButton/> component. This is a default function.")
        }
    }

    return(
        <>
        {/*Button container ---->*/}
        <div 
        style={{
            userSelect: 'none',
            width:'fit-content',
            alignContent:'center',
            textAlign:'center',
            backgroundColor:isHovered, 
            color:textcolor, 
            padding:'.6rem .6rem', 
            borderRadius:'30px', 
            display: 'inline-block',
            transition: '100ms',
            transform: isHovered == clickColor ? 'scale(0.95)': 'scale(1)',
        }} 
        onMouseEnter={handleOnMouseEnter} 
        onMouseLeave={handleOnMouseLeave}
        onMouseDown={handleOnMouseDown}
        onMouseUp={handleOnMouseEnter}
        onClick={handleClick}>

            {/*Conditionally rendering button icon*/}
            {iconUrl && 
                <div style={{display: 'flex', width:'1.2rem', height:'1.2rem', float:'left'}}>
                    <div style={{mask:`url(${iconUrl}) 0 0 / contain no-repeat`, width:'100%',backgroundColor:iconColor!=null ? iconColor:textcolor, float:'center'}}/>
                </div>}

            {/*Conditionally rendering button text */}
            {text != "" && <div style={{display: "inline-block", marginInlineStart:iconUrl && '.5rem'}}>{text}</div>}
            
        </div>
        </>
    );
}
