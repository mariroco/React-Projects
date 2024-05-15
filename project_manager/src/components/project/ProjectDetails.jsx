import Pencil from "../../assets/svg/pencil.svg";
import Trash from "../../assets/svg/trash.svg";
import Task from "../task/Task.jsx";
export default function ProjectDetails() {
    const iconArray = [Pencil,Trash];
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
                                <div style={{backgroundColor:'black', mask:`url(${iconArray[1]}) 0 0 / contain no-repeat`, width: '100%'}}/>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', width:'1.5rem', height:'1.5rem', float:'right', marginInline:'.5rem'}}>
                                <div style={{backgroundColor:'black', mask:`url(${iconArray[0]}) 0 0 / contain no-repeat`, width: '100%'}}/>
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
                        <td>
                            Project description
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p className='ProjectTitle'>Tasks</p>
                        </td>
                    </tr>
                    <tr>
                        <td><Task/></td>
                    </tr>
                </tbody>
            </table>
        </>
    );  
}