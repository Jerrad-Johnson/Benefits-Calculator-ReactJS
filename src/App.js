import './App.css';
import Home from './Home.js';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navigation from "./Navigation";
import About from "./About";


const App = () => {
  return (
    <div>
        <Router>
            <Navigation/>
            <Routes>
                <Route path="/About.js" element={<About />}> </Route>
                <Route path="" element={<Home />}> </Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;

