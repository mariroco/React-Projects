import EmojiBtn from "../buttons/EmojiButton";
export default function NavBar(){
    return(
    <div style={{display: 'flex', flexDirection: 'row', width:' fit-content', height: 'fit-content', margin: '1rem'}}>
        <EmojiBtn/>
        <div>
            <h1>
                My
                <br/>
                Project Manager
            </h1>
        </div>
        
    </div>);
}