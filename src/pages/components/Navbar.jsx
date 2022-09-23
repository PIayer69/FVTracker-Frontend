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
                    ? <>
                        <li onClick={() => navigate('/settings')}>Ustawienia</li>
                        <li onClick={() => navigate('/welcome')}>Strona główna</li>
                    </>
                    :<>
                        <li onClick={() => navigate('/')}>Strona główna</li>
                        <li onClick={() => navigate('/settings')}>Ustawienia</li>
                        <li onClick={() => navigate('/welcome/login')}>Logowanie</li>
                        <li onClick={() => navigate('/welcome/register')}>Rejestracja</li>
                    </>
                }
                
            </ul>
        </div>
    </nav>
  )
}

export default Navbar