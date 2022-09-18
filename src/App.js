import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Welcome from './pages/Welcome';
import Home from './pages/Home';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/welcome' element={<Welcome />}>
          <Route path=':page' element={<Welcome />}/>
        </Route>
        <Route path='/home' element={<Home />}/>

      </Routes>
    </Router>
  );
}

export default App;
