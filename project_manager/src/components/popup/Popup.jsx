
import IconButton from "../buttons/IconButton";
import RoundedTextInput from "../inputs/RoundedTextInput";
import RoundedButton from "../buttons/RoundedButton";
import CloseIcon from "../../assets/svg/close.svg"
import './popup.css'
export default function Popup({title='Popup title', children=<p>It's empty in here...</p>, closePopup}){
    return(
        <div className='popup-main'>
        <div className='popup'>
          <div className='popup-header'>
            {title}
            <IconButton iconUrl={[CloseIcon]} buttonFunction={closePopup}/>
          </div>
          <div>
            {children}
          </div>
        </div>
      </div>
    );
}