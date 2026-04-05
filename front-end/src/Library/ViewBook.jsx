import { useEffect, useState } from "react";
import Navbar from "../Nav/Navbar";
import Handle_User_Permission from "../Shared_Functions/Sessions_Functions";


function Staff_ViewBooks(){
    const [books, setBooks] = useState([]);
    useEffect(()=>{loadBookCatalog()}, []);

    function loadBookCatalog(){
    fetch("http://sdclb-108821170.us-east-1.elb.amazonaws.com/book/viewBookCatalog", {method: "GET"})
    .then((res)=>{return res.json()})
    .then((data)=>{
       setBooks(data);
    })
    }

    return(
        <>
        <Handle_User_Permission webpageRole = "staff">
            <Navbar pageType = "Books Catalog"/>
            
            <table className="table table-striped-columns" id="staff_viewBooks_table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">ISBN</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Available Stock</th>
                  
                    </tr>
                </thead>
                <tbody id="staff_viewBooks_tableBody">
                    {books.map((book, index)=>{
                        return(
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{book.isbn}</td>
                                <td>{book.book_name}</td>
                                <td>{book.author}</td>
                                <td>{book.quantity}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </Handle_User_Permission>
        </>
    );
}

export default Staff_ViewBooks;