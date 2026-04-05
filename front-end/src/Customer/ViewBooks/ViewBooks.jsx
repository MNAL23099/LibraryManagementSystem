import { useEffect, useState } from "react";
import Navbar from "../../Nav/Navbar";
import "./ViewBooks.css";
import Handle_User_Permission from "../../Shared_Functions/Sessions_Functions";

function borrowBook(bookISBN){
        console.log("Borrow book function called!");
        console.log(bookISBN);

        fetch("http://sdclb-108821170.us-east-1.elb.amazonaws.com/book/borrowBook", {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({bookISBN: bookISBN})
        })
        .then((res)=>{return res.text()})
        .then((textRes)=>{
            if (textRes == "success"){window.alert("Your request has been recoreded, please wait till staff approval!");}
            else if (textRes == "book_is_out_of_stock"){window.alert("Book is no longer in stock!");}
            else if (textRes == "empty_input_fields"){window.alert("Please fill all input fields!");}
            else if (textRes == "borrow_already_in_progress"){window.alert("You already have an ongoing borrow for this book!");}
            else {window.alert("An unexpected error has occured!");}
        })
    }

function Customer_ViewBooks(){
    
    useEffect(()=>{loadBookCatalog()}, []);
    const [books, setBooks] = useState([]);

    function loadBookCatalog(){

    fetch("http://sdclb-108821170.us-east-1.elb.amazonaws.com/book/viewBookCatalog", {method: "GET"})
    .then((res)=>{return res.json()})
    .then((data)=>{
        setBooks(data);
    })
    }
    
    return(
        <>
        <Handle_User_Permission webpageRole = "customer">
            <Navbar pageType = "Books Catalog"/>
            
            <table className="table table-striped-columns" id="customer_viewBooks_table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Available Stock</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody id="customer_viewBooks_tableBody">
                    {books.map((book, index)=>{
                        return(
                            <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{book.book_name}</td>
                            <td>{book.author}</td>
                            <td>{book.quantity}</td>
                            <td><button className="btn btn-success" type="button" onClick={()=>{borrowBook(book.isbn)}}>{"Borrow"}</button></td>
                            </tr>
                        )
                    })}
        
                </tbody>
            </table>
            </Handle_User_Permission>
        </>
    );
}

export default Customer_ViewBooks;