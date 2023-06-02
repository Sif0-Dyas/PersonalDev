import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./views/Home"
import  Create  from "./views/Create";
import Display from "./views/Home";
import Edit from "./views/Edit";
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <h1>Bass Stage</h1>

        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/details/:id" element={<Display />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;