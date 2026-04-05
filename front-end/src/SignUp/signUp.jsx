import "./signUp.css";
import Navbar from "../Nav/Navbar";
import { useNavigate, useNavigation } from "react-router-dom";
import { useState } from "react";

function SignUp() {

    const navigate = useNavigate();

    //These are the variables of the form
    //When the form gets submitted, the input values get saved in these variables
    const [userName, setUserName] = useState("");
    const [userPass, setUserPass] = useState("");
    const [accountType, setAccountType] = useState("");
    const [userEmail, setUserEmail] = useState("");

    //Submit the form
    function submitForm(e){
        e.preventDefault();

        fetch("http://sdclb-108821170.us-east-1.elb.amazonaws.com/auth/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username : userName, password: userPass, email: userEmail, accountType: accountType})
        }).then((res) => res.text())
        .then((textResponse) => {
            console.log(textResponse);
            if (textResponse == "user_already_exists"){
                window.alert("Account on this email already exists!");
            }
            else if (textResponse == "success"){
                window.alert("Account has been created! You have been sent an SNS subscription confirmation email, kindly accept it!");
                navigate("/"); //Navigtate to homepage
            }
            else if (textResponse == "missing_entries"){
                window.alert("Please fill all the form!");
            }
        });
    }

    return (
        <>
            <Navbar pageType="Sign Up" />
            <div className="sign-up-page">
                <div style={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    background: "var(--card-bg)",
                    borderRadius: "20px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                    padding: "1rem 1rem",
                    minHeight: "180px",
                    maxWidth: "420px",
                    width: "100%",
                    border: "1px solid rgba(255,255,255,0.04)",
                    color: "var(--text)"
                }}>
                    <form onSubmit={submitForm} id="form_1">
                        <h1 style={{
                            textAlign: "center",
                            marginBottom: "2rem",
                            color: "#fff",
                            fontWeight: 800,
                            letterSpacing: "1px",
                            fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif"
                        }}>Customer Sign Up</h1>

                        <div className="mb-3">
                            <label htmlFor="signup-name" className="form-label" style={{fontWeight: 500, color: 'var(--primary)'}}>Name</label>
                            <input onChange={(e) => setUserName(e.target.value)} type="text" className="form-control" id="signup-name" style={{borderRadius: "8px", background: 'transparent', color: 'var(--text)', border: '1px solid rgba(255,255,255,0.06)'}} aria-describedby="emailHelp" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="signup-email" className="form-label" style={{fontWeight: 500, color: 'var(--primary)'}}>Email address</label>
                            <input onChange={(e) => setUserEmail(e.target.value)} type="email" className="form-control" id="signup-email" style={{borderRadius: "8px", background: 'transparent', color: 'var(--text)', border: '1px solid rgba(255,255,255,0.06)'}} aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text" style={{color: 'var(--muted)'}}>We'll never share your email with anyone else.</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="signup-password" className="form-label" style={{fontWeight: 500, color: 'var(--primary)'}}>Password</label>
                            <input onChange={(e) => setUserPass(e.target.value)} type="password" className="form-control" id="signup-password" style={{borderRadius: "8px", background: 'transparent', color: 'var(--text)', border: '1px solid rgba(255,255,255,0.06)'}} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="signup-accountType" className="form-label" style={{fontWeight: 500, color: 'var(--primary)'}}>Account Type</label>
                            <select onChange={(e) => setAccountType(e.target.value)} className="form-select" id="signup-accountType" style={{borderRadius: "8px", background: 'transparent', color: 'var(--text)', border: '1px solid rgba(255,255,255,0.06)'}} aria-label="Default select example">
                                <option value="not_selected">Account Type</option>
                                <option value="customer">Customer</option>
                            </select>
                        </div>

                        <button type="submit" className="btn w-100 pretty-btn">Sign Up</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;