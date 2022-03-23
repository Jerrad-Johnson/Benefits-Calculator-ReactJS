import {BrowserRouter as Router, Link} from "react-router-dom";

function Navigation(){
    return(
        <div>
            <Router >
            <li> <Link to="./Home.js">Home</Link> </li>
            </Router>
        </div>
    );
}

export default Navigation;