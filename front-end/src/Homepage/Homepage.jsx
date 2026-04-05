import Navbar from "../Nav/Navbar";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

function Homepage(){

    // The navigation changes when the user clicks on either the sign in or the sign up button
    const navigation = useNavigate();
    function goToSignUp(e){
        e.preventDefault();
        navigation("/signup");
    }
    function goToSignIn(e){
        e.preventDefault();
        navigation("/signin");
    }

    return(
        <>
        <Navbar pageType="Home Page"/>
   
        <div id="homepage_div_1">
            <div className="homepage-center-content">
                <h1 className="homepage-welcome">Welcome To Library Management Homepage</h1>
                <div className="homepage-card-container">
                    <div className="homepage-card">
                        <h2>New here?</h2>
                        <p>Create a customer account to join the library.</p>
                        <button id="div_1-button_1" type="button" className="btn homepage-btn" onClick={goToSignUp}>Sign Up</button>
                    </div>
                    <div className="homepage-card">
                        <h2>Already a member?</h2>
                        <p>Sign in to your account.</p>
                        <button id="div_1-button_2" type="button" className="btn homepage-btn" onClick={goToSignIn}>Sign In</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );

}

export default Homepage;