import Pencil from "../../assets/svg/pencil.svg";
import Trash from "../../assets/svg/trash.svg";
import Plus from "../../assets/svg/plus.svg"
import Task from "../task/Task.jsx";
import RoundedButton from "../buttons/RoundedButton.jsx";
export default function ProjectDetails() {
    const iconArray = [Pencil,Trash,Plus];
    return(
        <>
            <table style={{width: '100%', padding: '3rem', paddingBottom: '1rem'}}>
                <thead>
                    <tr>
                        <td>
                            <p className='ProjectTitle'>Project title goes here</p>
                        </td>
                        <td style={{textAlign: 'right'}}>
                            <div style={{display: 'flex', flexDirection: 'row', width:'1.5rem', height:'1.5rem', float:'right'}}>
                                <div className="IconButton" style={{mask:`url(${iconArray[1]}) 0 0 / contain no-repeat`}}/>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', width:'1.5rem', height:'1.5rem', float:'right', marginInline:'.5rem'}}>
                                <div className="IconButton" style={{mask:`url(${iconArray[0]}) 0 0 / contain no-repeat`}}/>
                            </div>
                            
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                        Date
                        <hr/>
                        </td>
                    </tr>
                </thead>
                </table>
               
                <table  style={{width: '100%', paddingInline: '3rem'}}>
                <tbody>
                    <tr>
                        <td style={{paddingBottom: '20px'}}>
                            Project description
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p style={{display:'inline-block'}} className='ProjectTitle'>Tasks</p> <RoundedButton iconUrl={iconArray[2]} text="Add Task" hoverColor="orangered"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Task/>
                            <Task/>
                            <Task/>
                        </td>
                    </tr>
                </tbody>
            </table>
            
        </>
    );  
}