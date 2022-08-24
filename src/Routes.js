import { Route, Routes } from 'react-router-dom';
import './tailwind.css';
import Home from './pages/common/Home';
import Register from './pages/common/Register';
import Login from './pages/common/Login';
import StudentHome from './pages/student/Home';
import StudentCae from './pages/student/Cae'
import StaffHome from './pages/staff/Home';
import StaffSubject from './pages/staff/SubjectView';

function RoutesManager() {
  return (
    <div className="App">
      <Routes>
        <Route exact path = "/" element = { <Home /> } />
        <Route exact path = "/home" element = { <Home /> } />
        <Route exact path = "/login" element = { <Login /> } />
        <Route exact path = "/register" element = { <Register /> } />
        <Route exact path = "/student/cae" element = { <StudentCae /> } />
        <Route exact path = "/student/home" element = { <StudentHome /> } />
        <Route exact path = "/staff/home" element = { <StaffHome /> } />
        <Route exact path = "/staff/subject/:id" element = { <StaffSubject /> } />
        <Route exact path = "/staff/cae" element = { <StaffHome /> } />
      </Routes>
    </div>
  );
}

export default RoutesManager;
