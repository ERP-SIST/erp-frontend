import { Route, Routes } from 'react-router-dom';
import './tailwind.css';
import Home from './pages/common/Home';

function RoutesManager() {
  return (
    <div className="App">
      <Routes>
        <Route exact path = "/" element = { <Home /> } />
      </Routes>
    </div>
  );
}

export default RoutesManager;
