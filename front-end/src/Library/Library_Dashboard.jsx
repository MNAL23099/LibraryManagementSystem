import Navbar from "../Nav/Navbar";
import './Library.css';
// import addBookCard from "../../../assets/addInventory.png";
// import editBookCard from "../../../assets/editInventoryCard.png";
import { useNavigate } from "react-router-dom";
import Handle_User_Permission from "../Shared_Functions/Sessions_Functions";

function Library_Dashboard(){

    const navigate = useNavigate();

    function goToAddBook(){
        navigate("/library/addBook");
    }

    function goToEditBook(){
        navigate("/Library/editBook");
    }
    function goToViewBook(){
        navigate("/library/viewBook");
    }
    return (
        <>
            <Handle_User_Permission webpageRole = "staff">
            <Navbar pageType="Library Dashboard"/>

            <div style={{
                marginTop: "3rem",
                display: "flex",
                gap: "2rem",
                justifyContent: "center",
                flexWrap: "wrap"
            }}>

            {/* Add Book */}
            <div onClick={goToAddBook} className="card library-card" style={cardStyle}>
                <img src={'/images/book1.svg'} className="card-img-top" style={imgStyle} alt="Add book"/>
                <div className="card-body text-center">
                    <h5 style={titleStyle}>Add Book</h5>
                    <p>Add new books to library</p>
                    <button className="btn w-100 pretty-btn">Add</button>
                </div>
            </div>

            {/* Edit Book */}
            <div onClick={goToEditBook} className="card library-card" style={cardStyle}>
                <img src={'/images/book2.svg'} className="card-img-top" style={imgStyle} alt="Edit books"/>
                <div className="card-body text-center">
                    <h5 style={titleStyle}>Edit Books</h5>
                    <p>Edit or delete existing books</p>
                    <button className="btn w-100 pretty-btn">Edit</button>
                </div>
            </div>
              <div onClick={goToViewBook} className="card library-card" style={cardStyle}>
                <img src={'/images/book2.svg'} className="card-img-top" style={imgStyle} alt="View books"/>
                <div className="card-body text-center">
                    <h5 style={titleStyle}>View Books</h5>
                    <p>View existing books</p>
                    <button className="btn w-100 pretty-btn">View</button>
                </div>
            </div>

            {/* View Borrowings */}
            <div onClick={()=>{navigate("viewBorrows")}} className="card library-card" style={cardStyle}>
                <img src={'/images/book3.svg'} className="card-img-top" style={imgStyle} alt="View borrows"/>
                <div className="card-body text-center">
                    <h5 style={titleStyle}>View Book Borrowings</h5>
                    <p>View and manage all the books and their borrowings</p>
                    <button className="btn w-100 pretty-btn">View</button>
                </div>
            </div>

            </div>
            </Handle_User_Permission>
        </>
    );
}

const cardStyle = {
    width: "18rem",
    background: "var(--card-bg)",
    borderRadius: "1rem",
    boxShadow: "0 4px 24px rgba(26,26,26,0.10)",
    border: "1px solid rgba(26,26,26,0.08)",
    cursor: "pointer"
};

const imgStyle = {
    height: "140px",
    objectFit: "cover"
};

const titleStyle = {
    fontWeight: 700,
    color: "var(--primary)"
};

// Buttons are styled via the global .pretty-btn class in App.css

export default Library_Dashboard;
