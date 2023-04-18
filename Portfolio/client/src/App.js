import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import PortfolioPage from "./components/PortfolioMain";
import StickyNavbar from './components/StickyNavBar';

function App() {
  return (
    <div className="App">
      <div>
        <PortfolioPage/>
        <StickyNavbar/>
      </div>
    </div>
  );
}

export default App;