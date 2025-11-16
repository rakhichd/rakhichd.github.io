import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Project0 from './pages/Project0';
import Project1 from './pages/Project1';
import Project2 from './pages/Project2';
import Project3 from './pages/Project3';
import Project4 from './pages/Project4';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <nav className="toolbar">
        <Link to="/" className="logo" style={{ textDecoration: "none", color: "white" }}>
          rakhi chadalavada
        </Link>
        <div className="nav-links">
          <Link to="/">home</Link>
          {/* <Link to="/about">about</Link> */}
          <Link to="/project0">project 0</Link>
          <Link to="/project1">project 1</Link>
          <Link to="/project2">project 2</Link>
          <Link to="/project3">project 3</Link>
          <Link to="/project4">project 4</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/project0" element={<Project0 />} />
        <Route path="/project1" element={<Project1 />} />
        <Route path="/project2" element={<Project2 />} />
        <Route path="/project3" element={<Project3 />} />
        <Route path="/project4" element={<Project4 />} />
      </Routes>
    </Router>
  );
}

export default App;
