import Navbar from "../../../../Nav/Navbar";
import { useNavigate } from "react-router-dom";

function Inventory_Requests_Dashboard(){

    const navigation = useNavigate();

    function goToHandlePendingRequests(){
        navigation("/superManager/handleInventoryRequests");
        window.location.reload();
    }

    return (
        <>
            <Navbar pageType = "Inventory Requests Dashboard"/>

            <div id="inventory-div_1">
                {/* View inventory card */}
                <div onClick={goToHandlePendingRequests} className="card" style={{width: "18rem", background: "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)", borderRadius: "1rem", boxShadow: "0 4px 24px rgba(255, 152, 0, 0.15)", border: "1.5px solid #ff9800"}}>
                <img src={"#"} className="card-img-top" alt="..." style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem", height: "140px", objectFit: "cover" }} />
                <div className="card-body" style={{ background: "#fff3e0", color: "#e65100", borderRadius: "0 0 1rem 1rem" }}>
                    <h5 className="card-title" style={{ fontWeight: 700 }}>Handle Pending Requests</h5>
                    <p className="card-text">Accept Or Reject Pending Inventory Requests From Sub Manager</p>
                    <a className="btn btn-primary" style={{ background: "linear-gradient(90deg, #ff9800 0%, #ffb74d 100%)", color: "#fff", borderRadius: "25px", fontWeight: 700, border: "2px solid #e65100" }}>View</a>
                </div>
                </div>

                {/* Add inventory card */}
                <div className="card" style={{width: "18rem", background: "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)", borderRadius: "1rem", boxShadow: "0 4px 24px rgba(255, 152, 0, 0.15)", border: "1.5px solid #ff9800"}}>
                    <img src={"#"} className="card-img-top" alt="..." style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem", height: "140px", objectFit: "cover" }} />
                    <div className="card-body" style={{ background: "#fff3e0", color: "#e65100", borderRadius: "0 0 1rem 1rem" }}>
                        <h5 className="card-title" style={{ fontWeight: 700 }}>Requests History </h5>
                        <p className="card-text">View Inventory Requests History</p>
                        <a className="btn btn-primary" style={{ background: "linear-gradient(90deg, #ff9800 0%, #ffb74d 100%)", color: "#fff", borderRadius: "25px", fontWeight: 700, border: "2px solid #e65100" }}>Add</a>
                    </div>
                </div>

            </div>
        
        </>
    );
}

export default Inventory_Requests_Dashboard;