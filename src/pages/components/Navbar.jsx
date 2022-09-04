import { useNavigate } from 'react-router-dom';

import '../assets/navbar.css';

const Navbar = () => {
    let navigate = useNavigate();

  return (
    <nav>
        <div className='nav-container'>
            Logo
            <ul>
                {
                    localStorage.getItem('access_token')
                    ? <></>
                    :<>
                        <li onClick={() => navigate('/welcome/login')}>Login</li>
                        <li onClick={() => navigate('/welcome/register')}>Register</li>
                    </>
                }
                
            </ul>
        </div>
    </nav>
  )
}

export default Navbar