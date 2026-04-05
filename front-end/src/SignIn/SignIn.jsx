import { useState } from "react";
import Navbar from "../Nav/Navbar";
import { useNavigate } from "react-router-dom";

function SignIn(){

    const navigate = useNavigate();

    function goToCustomerDashboard() {
        navigate("/customer_dashboard");
    }

    function goToStaffDashboard() {
        navigate("/library_Dashboard");
    }

    function goToWebsiteAdminDashboard(){
        navigate("/website_admin_dashboard");
    }

    function goToDeskPersonDashboard(){
        navigate("/inventory_dashboard");
    }

    const [email, setEmail] = useState("");
    const [password, setPasseword] = useState("");

    function submitform(e) {
        e.preventDefault();
        fetch("http://sdclb-108821170.us-east-1.elb.amazonaws.com/auth/signin", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.status === "missing_fields") {
                    window.alert("Fill all the fields");
                } else if (res.status === "credentials_mismatch") {
                    window.alert("Credentials mismatched, try again");
                } else if (res.status === "success") {
                    window.alert(`Logged in as ${res.role}`);
                    if (res.role === "customer") {
                        goToCustomerDashboard();
                    }
                    else if (res.role === "staff") {
                        goToStaffDashboard();
                    }
                    else if (res.role === "website_admin"){
                        goToWebsiteAdminDashboard();
                    }
                    else if (res.role === "desk_person"){
                        goToWebsiteAdminDashboard();
                    }
                }
                else if (res.status === "error") {
                    window.alert("Unexpected response from server.");
                }
                else if (res.status === "terminated"){
                    window.alert("You can't login, your account is terminated!");
                }
            });
    }

    return (
        <>
            <Navbar pageType="Sign In" />

            <div style={{
                minHeight: "115vh",
                background: "linear-gradient(rgba(244,241,234,0.78), rgba(244,241,234,0.78)), url('/images/library-signin.svg') center/cover no-repeat",
                backgroundAttachment: "fixed",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start"
            }}>
                <div style={{
                    marginTop: "4rem",
                    backgroundColor: "var(--card-bg)",
                    borderRadius: "1.5rem",
                    boxShadow: "0 8px 32px rgba(26,26,26,0.10), 0 2px 8px rgba(26,26,26,0.06)",
                    padding: "3rem 2.5rem",
                    maxWidth: "480px",
                    width: "100%",
                    border: "1px solid rgba(26,26,26,0.08)",
                    color: "var(--text)",
                    fontWeight: 700,
                    backdropFilter: "blur(2px)",
                    transition: "box-shadow 0.3s, border 0.3s"
                }}>
                    <form onSubmit={submitform} id="form_1">
                        <h1 style={{
                            textAlign: "center",
                            marginBottom: "2rem",
                            color: "var(--primary)",
                            fontWeight: 800,
                            letterSpacing: "1px",
                            fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif"
                        }}>Sign In</h1>

                        <div className="mb-3">
                            <label htmlFor="signin-email" className="form-label" style={{ fontWeight: 500, color: 'var(--primary)' }}>Email address</label>
                            <input onChange={(e) => { setEmail(e.target.value) }} type="email" className="form-control" id="signin-email" style={{ borderRadius: "8px", background: 'var(--card-bg)', color: 'var(--text)', border: '1px solid rgba(26,26,26,0.08)' }} aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text" style={{ color: 'var(--muted)' }}>We'll never share your email with anyone else.</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="signin-password" className="form-label" style={{ fontWeight: 500, color: 'var(--primary)' }}>Password</label>
                            <input onChange={(e) => { setPasseword(e.target.value) }} type="password" className="form-control" id="signin-password" style={{ borderRadius: "8px", background: 'var(--card-bg)', color: 'var(--text)', border: '1px solid rgba(26,26,26,0.08)' }} />
                        </div>

                       
                             
                        <button type="submit" className="btn w-100 pretty-btn">Sign In</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignIn;