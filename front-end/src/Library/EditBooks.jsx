import { useState } from "react";
import Navbar from "../Nav/Navbar";
import './Library.css';
import Handle_User_Permission from "../Shared_Functions/Sessions_Functions";

function EditBook(){
    fetchAndDisplayBooks();

    const [bookName, setBookName] = useState("");
    const [author, setAuthor] = useState("");
    const [isbn, setIsbn] = useState("");
    const [quantity, setQuantity] = useState("");
    const [id, setID] = useState("");

    return(
    <>
        <Handle_User_Permission webpageRole = "staff">
        <Navbar pageType="Edit Library Books"/>

        <div style={{
            minHeight: "100vh",
            background: "var(--bg-1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
        <div style={{
            background: "var(--card-bg)",
            padding: "2rem",
            borderRadius: "18px",
            width: "380px",
            border: "1px solid var(--primary)"
        }}>
            <div className="component-hero"><img src="/images/book2.svg" className="page-hero-img" alt="Edit book"/><h2>Edit Book</h2></div>
            {/* Dropdown */}
            <div className="dropdown mb-4">
                <button className="btn btn-warning dropdown-toggle w-100" data-bs-toggle="dropdown">
                    Current Books
                </button>
                <ul id="editBook-dropDown" className="dropdown-menu w-100"></ul>
            </div>

            <input
                id="editBook-name"
                type="text"
                placeholder="Book Name"
                className="form-control mb-2"
                onChange={(e)=>setBookName(e.target.value)}
            />

            <input
                id="editBook-author"
                type="text"
                placeholder="Author"
                className="form-control mb-2"
                onChange={(e)=>setAuthor(e.target.value)}
            />

            <input
                id="editBook-isbn"
                type="text"
                placeholder="ISBN"
                className="form-control mb-2"
                onChange={(e)=>setIsbn(e.target.value)}
            />

            <input
                id="editBook-quantity"
                type="number"
                placeholder="Quantity"
                className="form-control mb-2"
                onChange={(e)=>setQuantity(e.target.value)}
            />

            <input id="editBook-id" type="hidden" />

            <button
                onClick={()=>submitEditedBook(bookName, author, isbn, quantity, id)}
                className="btn btn-warning w-100 mb-2"
            >
                Save Changes
            </button>

            <button
                onClick={()=>deleteBook(id)}
                className="btn btn-outline-dark w-100"
            >
                Delete Book
            </button>

        </div>
        </div>
        </Handle_User_Permission>
    </>
    );

    /* ================= FUNCTIONS ================= */

    function displayBookDetails(bookName, books){
        let book = books.find(b => b.book_name === bookName);

        document.getElementById("editBook-name").value = book.book_name;
        document.getElementById("editBook-author").value = book.author;
        document.getElementById("editBook-isbn").value = book.isbn;
        document.getElementById("editBook-quantity").value = book.quantity;
        document.getElementById("editBook-id").value = book.id;

        setBookName(book.book_name);
        setAuthor(book.author);
        setIsbn(book.isbn);
        setQuantity(book.quantity);
        setID(book.id);
    }

    function fetchAndDisplayBooks(){
        fetch("http://sdclb-108821170.us-east-1.elb.amazonaws.com/book/editBooks")
        .then(res => res.json())
        .then(data => {
            const dropDown = document.getElementById("editBook-dropDown");
            dropDown.innerHTML = "";

            data.forEach(book => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = "#";
                a.className = "dropdown-item";
                a.textContent = book.book_name;

                a.onclick = ()=>displayBookDetails(book.book_name, data);

                li.appendChild(a);
                dropDown.appendChild(li);
            });
        });
    }

    function submitEditedBook(name, author, isbn, quantity, id){
        fetch("http://sdclb-108821170.us-east-1.elb.amazonaws.com/book/submitEditedBook", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, author, isbn, quantity, id})
        })
        .then(res => res.text())
        .then(text => {
            if(text === "missing_entries") alert("Select a book first!");
            else if(text === "success") alert("Book updated!");
            window.location.reload();
        });
    }

    function deleteBook(id){
        fetch("http://sdclb-108821170.us-east-1.elb.amazonaws.com/book/deleteBook", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id})
        })
        .then(res => res.text())
        .then(text => {
            if(text === "missing_entries") alert("Select a book first!");
            else if(text === "success") alert("Book deleted!");
            window.location.reload();
        });
    }
}

export default EditBook;
