import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Project0 from './pages/Project0';

function App() {
  return (
    <Router>
      <nav className="toolbar">
        <Link to="/" className="logo">
          rakhi chadalavada
        </Link>
        <div className="nav-links">
          <Link to="/">home</Link>
          <Link to="/about">about</Link>
          <Link to="/project0">project 0</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project0" element={<Project0 />} />
      </Routes>
    </Router>
  );
}

export default App;
