import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Portfolio from "./components/PortfolioMain";
import SideNav from "./components/SideNav";
function App() {
  return (
    <div className="App">
      <div>
        <SideNav/>
        <Portfolio/>
      </div>
    </div>
  );
}

export default App;