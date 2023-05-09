import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Passport from './pages/Passport';
import Home from './pages/Home';
import NewEvent from './pages/NewEvent';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div>

      <BrowserRouter>
      <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/home' element={<Home />}/>
      <Route path='/passport' element={<Passport />} />
      <Route path='/newEvent' element={<NewEvent />}  />
      <Route path='/settings' element={<Settings />}  />

      </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
