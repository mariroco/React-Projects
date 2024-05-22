export default function RoundedTextInput({placeholder='Placeholder...'}){
    return(
       <input 
       type="text" 
       placeholder={placeholder}
       style={{
        width:'100%', 
        borderRadius:'30px', 
        outlineColor: 'orangered',
        fontFamily:'"Merriweather", serif',
        padding:'.8rem'}}/>
    );
}