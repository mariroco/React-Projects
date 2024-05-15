import './Task.css';

export default function Task(){
    return(
        <>
            <div style={{marginLeft: '1rem',display: 'block flex'}}>
                <div style={{width:'100%'}}>
                    <p>Here goes the task description.</p>
                </div>
                <div style={{textAlign:'center', verticalAlign:'middle'}}>
                    <input className='checkBox' type="checkbox" style={{marginTop: '1rem'}} /> 
                </div>
            </div>
            
        </>
    );
}