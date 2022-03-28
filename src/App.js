import logo from './logo.svg';
import './App.css';
import Home from './Home.js';
import Navigation from './Navigation.js';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


const App = () => {
  return (
    <div>
        <Router>
            <Navigation/>
            <Routes>
                <Route path="" element={<Home />}> </Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;

