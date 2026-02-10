import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Project0 from './pages/Project0';
import Project1 from './pages/Project1';
import Project2 from './pages/Project2';
import Project3 from './pages/Project3';
import Project4 from './pages/Project4';
import Project5 from './pages/Project5';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <nav className="toolbar">
        <Link to="/" className="logo" style={{ textDecoration: "none" }}>
          rakhi chadalavada
        </Link>
        <div className="nav-links">
          <Link to="/">home</Link>
          <Link to="/about">about</Link>
          <div className="dropdown">
            <span className="dropdown-trigger" role="button" aria-haspopup="true" aria-expanded="false" tabIndex={0}>
              projects <span className="caret" aria-hidden="true">▾</span>
            </span>
            <div className="dropdown-menu" role="menu">
              <Link to="/project0" role="menuitem">Becoming Friends with Your Camera</Link>
              <Link to="/project1" role="menuitem">Images of the Russian Empire</Link>
              <Link to="/project2" role="menuitem">Fun with Filters and Frequencies</Link>
              <Link to="/project3" role="menuitem">Stitching Photo Mosaics</Link>
              <Link to="/project4" role="menuitem">Neural Radiance Field</Link>
              <Link to="/project5" role="menuitem">Fun With Diffusion Models</Link>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project0" element={<Project0 />} />
        <Route path="/project1" element={<Project1 />} />
        <Route path="/project2" element={<Project2 />} />
        <Route path="/project3" element={<Project3 />} />
        <Route path="/project4" element={<Project4 />} />
        <Route path="/project5" element={<Project5 />} />
      </Routes>
    </Router>
  );
}

export default App;
