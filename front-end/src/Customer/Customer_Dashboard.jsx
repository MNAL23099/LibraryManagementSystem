import Navbar from "../Nav/Navbar";
import { useNavigate } from "react-router-dom";
import "./Customer_Dashboard.css";
import Handle_User_Permission from "../Shared_Functions/Sessions_Functions";

function Customer_Dashboard(){

    const navigation = useNavigate();

    return(
        <>
            <Handle_User_Permission webpageRole = "customer">
            <Navbar pageType = "Customer Dashboard"/>

            <div className="customer-dashboard">
                {/* Card 1 */}
                <div className="homepage-card">
                        <h2>Books Catalog</h2>
                        <p>View library books and book them.</p>
                        <button id="div_1-button_1" type="button" className="btn homepage-btn" onClick={()=>{navigation("viewBooks")}}>Go</button>
                </div>

                {/* Card 2 */}
                <div className="homepage-card">
                        <h2>View Bookings</h2>
                        <p>View current bookings.</p>
                        <button id="div_1-button_1" type="button" className="btn homepage-btn" onClick={()=>{navigation("viewBorrowedBooks")}}>Go</button>
                </div>
            </div>
            </Handle_User_Permission>
        </>
    );
}

export default Customer_Dashboard;