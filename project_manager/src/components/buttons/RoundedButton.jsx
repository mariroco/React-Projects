import { useState } from "react";

function defaultFunction(){
    console.log("'buttonFunction' prop is undefined on the <RoundedButton/> component. This is a default function.")
}


export default function RoundedButton({iconUrl=null, iconColor=null, text='Rounded Button', backgroundColor='black', textcolor='white', hoverColor='gray', buttonFunction=defaultFunction, ...props}){    
    const[isHovered, setIsHovered] = useState(backgroundColor);
    let textMargin = ()=>{
        if(iconUrl!=null){
            return('.5rem');
        }
        return('0rem');
    };

    function handleMouseEnter(){
        setIsHovered(hoverColor);
    }

    function handleMouseLeave(){
        setIsHovered(backgroundColor);
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
            margin:'1rem',
            display: 'inline-block'}} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave} 
        onClick={buttonFunction}>

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
