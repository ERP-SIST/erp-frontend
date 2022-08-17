import { Route, Routes } from 'react-router-dom';
import './tailwind.css';
import Home from './pages/common/Home';
import Register from './pages/common/Register';
import Login from './pages/common/Login';
import StudentHome from './pages/student/Home';
import Cae from './pages/student/Cae'

function RoutesManager() {
  return (
    <div className="App">
      <Routes>
        <Route exact path = "/" element = { <Home /> } />
        <Route exact path = "/home" element = { <Home /> } />
        <Route exact path = "/login" element = { <Login /> } />
        <Route exact path = "/register" element = { <Register /> } />
        <Route exact path = "/student/Cae" element = { <Cae /> } />
      </Routes>
    </div>
  );
}

export default RoutesManager;
