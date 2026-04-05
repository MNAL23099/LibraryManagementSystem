import Navbar from "../../Nav/Navbar";
import Handle_User_Permission from "../../Shared_Functions/Sessions_Functions";

function fetchData_borrowedBooks(){
    fetch("http://sdclb-108821170.us-east-1.elb.amazonaws.com/book/viewBorrowedBooks", {
        method: "POST",
        credentials: "include"
    })
    .then((res)=>{return res.json()})
    .then((data)=>{
        for(let i = 0; i< data.rows.length; i++){
            const targetTableBody = document.getElementById("customer_viewBorrowedBooks_tableBody");
            const row = document.createElement("tr");

            //Row count
            const rowCount = document.createElement("th");
            rowCount.scope = "row";
            rowCount.textContent = i + 1;

            //Book title
            const bookTitle = document.createElement("td");
            bookTitle.textContent = data.rows[i]["book_name"];

            //Author name
            const authorName = document.createElement("td");
            authorName.textContent = data.rows[i]["author"];

            //Borrow approval
            const borrowApproval = document.createElement("td");
            borrowApproval.textContent = data.rows[i]["borrow_approved_by_staff"];

            //Borrow completed
            //-> Borrow complted shows if this borrow has been returned by the user or not
            const borrowCompleted = document.createElement("td");
            borrowCompleted.textContent = data.rows[i]["borrow_completed"];

            // Deadline
            // -> If borrow has not been accepted or has been completed then there is no deadline
            function formatDate(dateVal){
                if (!dateVal) return "-";
                if (typeof dateVal === "string"){
                    if (dateVal.includes("T")) return dateVal.split('T')[0];
                    return dateVal;
                }
                try{ return new Date(dateVal).toISOString().slice(0,10); }
                catch(e){ return String(dateVal); }
            }

            const deadline = document.createElement("td");
            if (borrowApproval.textContent == "PENDING" || borrowCompleted.textContent == "YES" || borrowApproval.textContent == "REJECTED"){
                deadline.textContent = "-"}
            else {
                deadline.textContent = formatDate(data.rows[i]["deadline_date"]);
            }

            //Compile the table
            row.appendChild(rowCount);
            row.appendChild(bookTitle);
            row.appendChild(authorName);
            row.appendChild(borrowApproval);
            row.appendChild(borrowCompleted);
            row.appendChild(deadline);
            targetTableBody.appendChild(row);
        }
    })
}

function Customer_ViewBorrowedBooks(){
    fetchData_borrowedBooks();
    return(
        <>
          <Handle_User_Permission webpageRole = "customer">
            <Navbar pageType = "Current Books Borrowed" />
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Book Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Borrow Approval</th>
                    <th scope="col">Borrow Completed</th>
                    <th scope="col">Deadline</th>
                    </tr>
                </thead>
                <tbody id="customer_viewBorrowedBooks_tableBody">

                </tbody>
            </table>
            </Handle_User_Permission>
        </>
    );
}

export default Customer_ViewBorrowedBooks;