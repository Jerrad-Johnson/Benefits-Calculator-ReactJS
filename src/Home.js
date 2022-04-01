import Counter from "./Counter.js";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navigation from "./Navigation";


function Home() {
    return (
        <div>
            <Counter />
        </div>
    );
}

export default Home;