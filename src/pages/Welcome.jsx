import { useState } from "react";
import { useParams } from "react-router-dom";

import Login from './components/Login';
import Register from './components/Register';
import Backdrop from './components/Backdrop';
import './assets/welcome.css';
import './assets/form.css';

const Welcome = ({page}) => {
  let params = useParams();
    const [overlay, setOverlay] = useState({
        enabled: typeof params.page === 'undefined' ? false : true,
        login: params.page === 'login'
    })
  return (
    <div className="container center column">
        Strona główna
        <div>
            <span className="link pointer transition" onClick={() => setOverlay({enabled: true, login: true})}>Zaloguj się</span>
             lub <span className="link pointer transition" onClick={() => setOverlay({enabled: true, login: false})}>Zarejestruj</span>
        </div>
        {
            overlay.enabled 
            ?  overlay.login 
            ? <><Backdrop /><Login setOverlay={setOverlay}/></>
            : <><Backdrop /><Register setOverlay={setOverlay}/></>
            : null
        }
    </div>
  )
}

export default Welcome