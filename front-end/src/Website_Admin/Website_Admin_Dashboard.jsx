import Navbar from "../Nav/Navbar";
import { useNavigate } from "react-router-dom";
import Handle_User_Permission from "../Shared_Functions/Sessions_Functions";
import { useEffect } from "react";
import { useState } from "react";

function Website_Admin_Dashboard(){

    const navigation = useNavigate();
    
    function goToViewWebsiteAccounts(){
        navigation("viewAccounts");
    }

    function goToAddAccount(){
        navigation("addAccount");
    }

    // useEffect(()=> {
    //     async function checkUserPermission(){
    //         await Validate_User_Permission("website_admin");
    //     }
    //     checkUserPermission();
    // }, []);

    return(
        <>
            <Handle_User_Permission webpageRole = "website_admin">

                <Navbar pageType="Website Admin Dashboard"/>
                <div>
                    <div className="d-flex flex-wrap justify-content-center gap-4" style={{ marginTop: '3rem' }}>
                        {/* View website accounts Card */}
                        <div className="card d-flex flex-column justify-content-between" style={{ width: "15rem", background: "var(--card-bg)", borderRadius: "1rem", boxShadow: "0 4px 24px rgba(26,26,26,0.10)", border: "1px solid rgba(26,26,26,0.08)", fontFamily: 'Segoe UI, Arial, sans-serif', minHeight: '340px', marginTop: '1rem' }}>
                            <img src={"https://chipincorp.com/wp-content/uploads/2019/09/nt06-01-user-vs-group.jpg"} className="card-img-top" alt="Inventory" style={{ borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem", height: "140px", objectFit: "cover" }} />
                            <div className="card-body d-flex flex-column justify-content-between" style={{ background: "var(--card-bg)", color: "var(--text)", borderRadius: "0 0 1rem 1rem", flex: 1 }}>
                                <div className="text-center">
                                    <h5 className="card-title" style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1.15rem', marginBottom: '0.5rem' }}>View Website Accounts</h5>
                                    <p className="card-text" style={{ color: 'var(--primary)', fontSize: '1rem', marginBottom: '0.5rem' }}>View and manage all the accounts registered to the website.</p>
                                </div>
                                <button onClick={goToViewWebsiteAccounts} className="btn w-100 mt-auto" style={{ background: "linear-gradient(90deg, var(--section-bg) 0%, var(--bg-1) 100%)", color: "var(--primary)", borderRadius: "25px", fontWeight: 700, border: "none" }}>Go</button>
                            </div>
                        </div>
                        {/* Add accounts Card */}
                        <div className="card d-flex flex-column justify-content-between" style={{ width: "15rem", background: "var(--card-bg)", borderRadius: "1rem", boxShadow: "0 4px 24px rgba(0,36,107,0.10)", border: "1px solid rgba(0,36,107,0.12)", fontFamily: 'Segoe UI, Arial, sans-serif', minHeight: '340px', marginTop: '1rem' }}>
                            <img src={"https://www.cminds.com/wp-content/uploads/M2-Multi-User-Account.png"} className="card-img-top" alt="Inventory" style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem", height: "140px", objectFit: "cover" }} />
                            <div className="card-body d-flex flex-column justify-content-between" style={{ background: "var(--card-bg)", color: "var(--primary)", borderRadius: "0 0 1rem 1rem", flex: 1 }}>
                                <div className="text-center">
                                    <h5 className="card-title" style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1.15rem', marginBottom: '0.5rem' }}>Add Account</h5>
                                    <p className="card-text" style={{ color: 'var(--primary)', fontSize: '1rem', marginBottom: '0.5rem' }}>Add accounts for super manager and sub manager.</p>
                                </div>
                                <button onClick={goToAddAccount} className="btn w-100 mt-auto" style={{ background: "linear-gradient(90deg, var(--section-bg) 0%, var(--bg-1) 100%)", color: "var(--primary)", borderRadius: "25px", fontWeight: 700, border: "none", boxShadow: "0 8px 20px rgba(26,26,26,0.08)", padding: "0.7rem 0" }}>Go</button>
                            </div>
                        </div>
                    </div>
                </div>

            </Handle_User_Permission>
            
        </>
    );

}

export default Website_Admin_Dashboard;