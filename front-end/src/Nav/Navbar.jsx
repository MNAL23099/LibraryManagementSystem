import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar(props){

    const navigate = useNavigate();

    function goBack(){
        navigate(-1);
    }

    return(
        <nav className="navbar bg-body-tertiary" id="navbar_id">
            <div className="container-fluid">
                <b id="navbar-propType" className="navbar-brand">{props.pageType}</b>
                {/* props.pageType means the type of page user is currently inside, like it can be homepage, dashboard, etc */}
                <button className="btn go-back-btn" onClick={goBack}>Go Back</button>
            </div>
        </nav>
    );

}

export default Navbar;