import {Link} from "react-router-dom";

function Navigation(){
    return(
        <div className={"navigation bg-gray-300 border-solid border-2 border-gray-400 text-gray-700 p-5 " +
            "md:flex mx-auto md:w-140 leading-5 drop-shadow-md rounded-lg md:max-w-5xl my-3"}>
            <li className={"list-none font-medium drop-shadow-sm"}> <Link to={`./`}>Home</Link> </li>
            <li className={"list-none font-medium drop-shadow-sm md:ml-4"}> <Link to={`./About.js`}>About</Link> </li>

        </div>
    );
}

export default Navigation;