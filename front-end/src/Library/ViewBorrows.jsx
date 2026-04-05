import { useEffect, useState } from "react";
import Navbar from "../Nav/Navbar";
import './Library.css';
import Handle_User_Permission from "../Shared_Functions/Sessions_Functions";

function ViewBorrows(){
    useEffect(()=>{fetchBorrowings()}, []);
    const [borrows, setBorrows] = useState([]);

    function fetchBorrowings(){
       fetch("http://sdclb-108821170.us-east-1.elb.amazonaws.com/book/viewBorrows", {
            method: "GET",
        })
        .then((res)=>{return res.json();})
        .then((data)=>{setBorrows(data);})
    }

    function validateBorrowDateAndBorrowDeadline(staffApproval){
        if (staffApproval == "PENDING" || staffApproval == "REJECTED"){
            return "-";
        }
    }

    function formatDate(dateVal){
        if (!dateVal) return "-";
        // If already in YYYY-MM-DD or similar without time
        if (typeof dateVal === "string"){
            if (dateVal.includes("T")) return dateVal.split('T')[0];
            return dateVal;
        }
        try{ return new Date(dateVal).toISOString().slice(0,10); }
        catch(e){ return String(dateVal); }
    }

    function handleBorrowCompletion(value, customer_email, book_isbn){
        fetch("http://sdclb-108821170.us-east-1.elb.amazonaws.com/book/handleBorrowCompletion", 
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: (JSON.stringify({markValue: value, customer_email: customer_email, book_isbn: book_isbn}))
            }
        )
        .then((res)=>{return res.text();})
        .then((textResponse)=>{
            if (value == "YES" && textResponse == "success"){window.alert("Borrow has been marked as completed"); window.location.reload();}
            if (value == "NO" && textResponse == "success"){window.alert("Borrow has been marked as not-completed"); window.location.reload();}
            else if (textResponse == "failure"){window.alert("An unexpcted error has occured!"); window.location.reload();}
            else if (textResponse == "no_borrow_approval"){window.alert("This borrow is not approved by staff!"); window.location.reload();}
        })
    }

    function handleBorrowApproval(action, customer_email, book_isbn){
        fetch("http://sdclb-108821170.us-east-1.elb.amazonaws.com/book/handleBorrowApproval", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({action: action, customer_email: customer_email, book_isbn: book_isbn})
        })
        .then((res)=>{return res.text();})
        .then((textResponse)=>{
            if (textResponse == "success"){window.alert(`Borrow ${action.toLowerCase()} successfully`); window.location.reload();}
            else if (textResponse == "book_is_out_of_stock"){window.alert("Book is out of stock; cannot accept this borrow."); window.location.reload();}
            else if (textResponse == "already_approved"){window.alert("This borrow is already accepted"); window.location.reload();}
            else if (textResponse == "missing_entries"){window.alert("Missing input data for approval"); window.location.reload();}
            else {window.alert("An unexpected error occurred"); window.location.reload();}
        })
    }

    return(
        <>
            <Handle_User_Permission webpageRole = "staff">
            <Navbar pageType="View & Manage Book Borrows"/>

            <div className="component-hero"><img src="/images/book3.svg" className="page-hero-img" alt="View borrows"/></div>

            <table className="table" id="viewBorrows-tableHead">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Customer Email</th>
                    <th scope="col">Book ISBN</th>
                    <th scope="col">Staff Approval Of Borrow</th>
                    <th scope="col">Borrow Completion</th>
                    <th scope="col">Borrow Date</th>
                    <th scope="col">Borrow Deadline</th>
                    <th scope="col">Accept / Reject</th>
                    <th scope="col">Manage Completion</th>
                    </tr>
                </thead>
                <tbody id="viewBorrows-tableBody">
                {borrows.map((borrow, index)=>{
                    const displayBorrowDate = (borrow.borrow_approved_by_staff == "PENDING" || borrow.borrow_approved_by_staff == "REJECTED") ? "-" : formatDate(borrow.borrow_date);
                    const displayDeadlineDate = (borrow.borrow_approved_by_staff == "PENDING" || borrow.borrow_approved_by_staff == "REJECTED") ? "-" : formatDate(borrow.deadline_date);
                    return(
                        <tr key={`${borrow.customer_email}_${borrow.book_isbn}`}>
                        <th scope="row">{index + 1}</th>
                        <td>{borrow.customer_email}</td>
                        <td>{borrow.book_isbn}</td>
                        <td>{borrow.borrow_approved_by_staff}</td>
                        <td>{borrow.borrow_completed}</td>
                        <td>{displayBorrowDate}</td>
                        <td>{displayDeadlineDate}</td>
                        <td>
                            <button type="button" className="btn btn-success me-2" disabled={borrow.borrow_approved_by_staff == "ACCEPTED"} onClick={()=>{handleBorrowApproval("ACCEPTED", borrow.customer_email, borrow.book_isbn)}}>Accept</button>
                            <button type="button" className="btn btn-danger" disabled={borrow.borrow_approved_by_staff == "REJECTED"} onClick={()=>{handleBorrowApproval("REJECTED", borrow.customer_email, borrow.book_isbn)}}>Reject</button>
                        </td>
                        <td>
                            <button type="button" className="btn btn-success" onClick={()=>{handleBorrowCompletion("YES", borrow.customer_email, borrow.book_isbn)}}>Mark As Completed</button>
                            <button type="button" className="btn btn-danger" onClick={()=>{handleBorrowCompletion("NO", borrow.customer_email, borrow.book_isbn)}}>Mark As Not-Completed</button>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            </Handle_User_Permission>

        </>
    );
}

export default ViewBorrows;