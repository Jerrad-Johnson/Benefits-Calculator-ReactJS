import Counter from "./Counter.js";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navigation from "./Navigation";


function Home() {
    return (
        <div className={""}>
           {/* <Router>
                <Navigation/>
                <Routes>
                    <Route path="" element={<Home />}> </Route>
                </Routes>
            </Router>
*/}
            <Counter />
        </div>
    );
}

export default Home;