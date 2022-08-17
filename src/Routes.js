import { Route, Routes } from 'react-router-dom';
import './tailwind.css';
import Home from './pages/common/Home';
import Register from './pages/common/Register';
import Login from './pages/common/Login';

function RoutesManager() {
  return (
    <div className="App">
      <Routes>
        <Route exact path = "/" element = { <Home /> } />
        <Route exact path = "/home" element = { <Home /> } />
        <Route exact path = "/login" element = { <Login /> } />
        <Route exact path = "/register" element = { <Register /> } />
      </Routes>
    </div>
  );
}

export default RoutesManager;
