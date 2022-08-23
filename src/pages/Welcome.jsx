import { useState } from "react"

import Login from './components/Login';
import Register from './components/Register';
import Backdrop from './components/Backdrop';
import './assets/welcome.css';
import './assets/form.css';

const Welcome = () => {
    const [overlay, setOverlay] = useState({
        enabled: false,
        login: true
    })
  return (
    <div className="container center column">
        Strona główna
        <div>
            <span className="link pointer transition" onClick={() => setOverlay({enabled: true, login: true})}>Zaloguj się </span>
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