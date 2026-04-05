import Navbar from "../Nav/Navbar";
import viewInventoryCard from "../assets/viewInventoryCard.jpg";
import generateReportCard from "../assets/generateReportCard.png";
import editInventoryCard from "../assets/editInventoryCard.png";
import addInventoryCard from "../assets/addInventory.png";
import "./Inventory_Dashboard.css";
import { useNavigate, useNavigation } from "react-router-dom";


function Inventory_Dashboard(){

    const navigation = useNavigate();

    function goToAddItem(){
        navigation("/addInventory");
    }
    
    function goToEditInventory(){
        navigation("/editInventory");
    }
    
    function goToViewInventory(){
        navigation("/viewInventory");
        window.location.reload();
    }

    function goToHandleInventoryRequests(){
        navigation("/superManager/IRDashboard");
    }

    return (
        <>
            <Navbar pageType = "Inventory Dashboard"/>

            <div id="inventory-div_1" style={{marginTop: '3rem'}}>
            {/* View inventory card */}
            <div  onClick= {goToViewInventory} className="card d-flex flex-column justify-content-between" style={{width: "18rem", background: "var(--card-bg)", borderRadius: "1rem", boxShadow: "0 4px 24px rgba(26,26,26,0.10)", border: "1px solid rgba(26,26,26,0.08)", fontFamily: 'Segoe UI, Arial, sans-serif', minHeight: '340px', marginTop: '1rem'}}>
            <img src={viewInventoryCard} className="card-img-top" alt="..." style={{ borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem", height: "140px", objectFit: "cover" }} />
            <div className="card-body d-flex flex-column justify-content-between" style={{ background: "var(--card-bg)", color: "var(--text)", borderRadius: "0 0 1rem 1rem", flex: 1 }}>
                <div className="text-center">
                    <h5 className="card-title" style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1.15rem', marginBottom: '0.5rem' }}>View Current Inventory</h5>
                    <p className="card-text" style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: '0.5rem' }}>View the current stats of lab inventory</p>
                </div>
                <a className="btn w-100 mt-auto" style={{ background: "linear-gradient(90deg, var(--section-bg) 0%, var(--bg-1) 100%)", color: "var(--primary)", borderRadius: "25px", fontWeight: 700, border: "none", boxShadow: "0 8px 20px rgba(26,26,26,0.08)", padding: "0.7rem 0" }}>View</a>
            </div>
            </div>

            {/* Add inventory card */}
            <div onClick={goToAddItem} className="card d-flex flex-column justify-content-between" style={{width: "18rem", background: "var(--card-bg)", borderRadius: "1rem", boxShadow: "0 4px 24px rgba(26,26,26,0.10)", border: "1px solid rgba(26,26,26,0.08)", fontFamily: 'Segoe UI, Arial, sans-serif', minHeight: '340px', marginTop: '1rem'}}>
                <img src={addInventoryCard} className="card-img-top" alt="..." style={{ borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem", height: "140px", objectFit: "cover" }} />
                <div className="card-body d-flex flex-column justify-content-between" style={{ background: "var(--card-bg)", color: "var(--primary)", borderRadius: "0 0 1rem 1rem", flex: 1 }}>
                    <div className="text-center">
                        <h5 className="card-title" style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1.15rem', marginBottom: '0.5rem' }}>Add new inventory item</h5>
                        <p className="card-text" style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: '0.5rem' }}>Add a new inventory component</p>
                    </div>
                    <a className="btn w-100 mt-auto" style={{ background: "linear-gradient(90deg, var(--section-bg) 0%, var(--bg-1) 100%)", color: "var(--primary)", borderRadius: "25px", fontWeight: 700, border: "none", boxShadow: "0 8px 20px rgba(26,26,26,0.08)", padding: "0.7rem 0" }}>Add</a>
                </div>
            </div>

            {/* Edit inventory card */}
            <div onClick={goToEditInventory} className="card d-flex flex-column justify-content-between" style={{width: "18rem", background: "var(--card-bg)", borderRadius: "1rem", boxShadow: "0 4px 24px rgba(26,26,26,0.10)", border: "1px solid rgba(26,26,26,0.08)", fontFamily: 'Segoe UI, Arial, sans-serif', minHeight: '340px', marginTop: '1rem'}}>
            <img src={editInventoryCard} className="card-img-top" alt="..." style={{ borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem", height: "140px", objectFit: "cover" }} />
            <div className="card-body d-flex flex-column justify-content-between" style={{ background: "var(--card-bg)", color: "var(--primary)", borderRadius: "0 0 1rem 1rem", flex: 1 }}>
                <div className="text-center">
                    <h5 className="card-title" style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1.15rem', marginBottom: '0.5rem' }}>Edit Lab Inventory</h5>
                    <p className="card-text" style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: '0.5rem' }}>Edit the current stats of lab inventory</p>
                </div>
                <a className="btn w-100 mt-auto" style={{ background: "linear-gradient(90deg, var(--section-bg) 0%, var(--bg-1) 100%)", color: "var(--primary)", borderRadius: "25px", fontWeight: 700, border: "none", boxShadow: "0 8px 20px rgba(26,26,26,0.08)", padding: "0.7rem 0" }}>Edit</a>
            </div>
            </div>

            {/* Handle inventory requests from sub manager Card */}
            <div onClick={goToHandleInventoryRequests} className="card d-flex flex-column justify-content-between" style={{width: "18rem", background: "var(--card-bg)", borderRadius: "1rem", boxShadow: "0 4px 24px rgba(0,36,107,0.10)", border: "1px solid rgba(0,36,107,0.12)", fontFamily: 'Segoe UI, Arial, sans-serif', minHeight: '340px', marginTop: '1rem'}}>
            <img src={generateReportCard} className="card-img-top" alt="..." style={{ borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem", height: "140px", objectFit: "cover" }} />
            <div className="card-body d-flex flex-column justify-content-between" style={{ background: "var(--card-bg)", color: "var(--primary)", borderRadius: "0 0 1rem 1rem", flex: 1 }}>
                <div className="text-center">
                    <h5 className="card-title" style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1.15rem', marginBottom: '0.5rem' }}>Inventory Requests</h5>
                    <p className="card-text" style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: '0.5rem' }}>Accept or reject inventory related requests from sub managers. View requests record.</p>
                </div>
                <a className="btn w-100 mt-auto" style={{ background: "linear-gradient(90deg, var(--accent) 0%, var(--accent-700) 100%)", color: "var(--primary)", borderRadius: "25px", fontWeight: 700, border: "none", boxShadow: "0 8px 20px rgba(0,36,107,0.08)", padding: "0.7rem 0" }}>View</a>
            </div>
            </div>
            </div>
        
        </>
    );
}

export default Inventory_Dashboard;