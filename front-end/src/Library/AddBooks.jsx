import { useState } from "react";
import Navbar from "../Nav/Navbar";
import './Library.css';
import Handle_User_Permission from "../Shared_Functions/Sessions_Functions";

function AddBook(){

    const [bookName, setBookName] = useState("");
    const [author, setAuthor] = useState("");
    const [isbn, setIsbn] = useState("");
    const [quantity, setQuantity] = useState("");

    function submitForm(e){
        e.preventDefault();

        fetch("http://sdclb-108821170.us-east-1.elb.amazonaws.com/book/addBook", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                bookName: bookName,
                author: author,
                isbn: isbn,
                quantity: quantity
            }),
        })
        .then((response)=> response.text())
        .then((textResponse)=>{
            if (textResponse === "missing_entries"){
                alert("Please fill all entries!");
            }
            else if (textResponse === "new_book_added"){
                alert("New book added successfully!");
            }
            else if (textResponse === "book_updated"){
                alert("Book already exists! Quantity updated!");
            }
            else{
                alert("Unexpected error occurred!");
            }
            window.location.reload();
        });
    }

    return(
        <>
        <Handle_User_Permission webpageRole = "staff">
        <Navbar pageType="Add Library Book"/>

        <div style={{
            minHeight: "100vh",
            background: "var(--bg-1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
<form onSubmit={submitForm} className="library-form-card" style={{
            background: "var(--card-bg)",
            padding: "2rem",
            borderRadius: "18px",
            width: "370px",
            border: "1px solid var(--primary)"
        }}>
            <div className="component-hero"><img src="/images/book1.svg" className="page-hero-img" alt="Add book"/><h2 style={{textAlign:"center", margin:0}}>Add Book</h2></div>

            <input
                type="text"
                placeholder="Book Name"
                onChange={(e)=>setBookName(e.target.value)}
                className="form-control mb-3"
            />

            <input
                type="text"
                placeholder="Author Name"
                onChange={(e)=>setAuthor(e.target.value)}
                className="form-control mb-3"
            />

            <input
                type="text"
                placeholder="ISBN"
                onChange={(e)=>setIsbn(e.target.value)}
                className="form-control mb-3"
            />

            <input
                type="number"
                placeholder="Quantity"
                onChange={(e)=>setQuantity(e.target.value)}
                className="form-control mb-3"
            />

            <button type="submit" className="btn btn-warning w-100">
                Submit
            </button>
        </form>
        </div>
        </Handle_User_Permission>
        </>
    );
}

export default AddBook;
