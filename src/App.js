import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import UserSettings from './pages/UserSettings';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/welcome' element={<Welcome />}>
          <Route path=':page' element={<Welcome />}/>
        </Route>
        <Route path='/home' element={<Home />}/>
        <Route path='/' element={<Home />}/>
        <Route path='/settings' element={<UserSettings />}/>

      </Routes>
    </Router>
  );
}

export default App;
