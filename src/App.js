import logo from './logo.svg';
import './App.css';
import Home from './Home.js';
import Navigation from './Navigation.js';

import { BrowserRouter as Router, Link } from "react-router-dom";

const App = () => {
  return (
    <div>
        <Navigation />
        <Home />
    </div>
  );
}

export default App;
