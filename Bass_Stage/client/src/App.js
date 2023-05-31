import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <h1>Sample text</h1>

        <Routes>
          <Route path="/" element={<CALL_YOUR_COMPONENT_HERE />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;