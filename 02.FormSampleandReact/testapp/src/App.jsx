import AgeCalculator from "./components/AgeCalculator";
import NavBar from "./components/NavBar";
import Home from "./pages/home"
import StudentsDetails from "./pages/StudentsDetails";
import {Router, Routes, Route} from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import CrudeOperations from "./pages/CrudOperations";
import "./App.css";
function App() {
  return (
    <div className="app">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/crude-operations" element={<CrudeOperations />} />
          <Route path="/age-calculator" element={<AgeCalculator />} />
          <Route path="/student-details" element={<StudentsDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;