export default function WelcomePage(){
    return(
        <div style={{width:'100%', height:'100%', display:'flex'}}>
            <div style={{margin:'auto', marginTop:'20%', textAlign: 'center'}}>
                <p style={{fontFamily:'"Merriweather", serif', fontWeight:'bold', fontSize:'200%', color:'lightgray'}}>Welcome to your project manager!</p>
                <p style={{fontFamily:'"Merriweather", serif', color:'lightgray'}}>Select a project or create a new one on the left side bar.</p>
                
            </div>
        </div>
    );
}