import { useState } from "react";
import Navbar from "../../../../Nav/Navbar";

function Handle_Pending_Requests(){
const [inventoryItemName, setInventoryItemName] = useState(""); //In case super manager accepts the request of an inventory item, that name will be stored here
const [itemQuantity, setItemQuantity] = useState(""); //If the above thing happens then the quantity of that inventory item will be set here

    function fetchPendingRequestsFromDB(){ //This function will fetch the requests from the database, only those requests will be fetched which are marked as pending
    //..and then they will be displayed in the table

        fetch("http://sdclb-108821170.us-east-1.elb.amazonaws.com/inventory/pendingInventoryRequests", {
            method: "GET",
        })
        .then((res)=> {return res.json()})
        .then((data)=> {
            for (let i= 0; i< data.length; i++){
                const tBody = document.getElementById("superM-handlePendingInventoryRequests-tableBody");

                const tR = document.createElement("tr");

                //Number of the row
                const rowCount = document.createElement("th");
                rowCount.scope = "row";
                rowCount.textContent = i + 1;

                //The name of the requested item
                const itemName = document.createElement("td");
                itemName.textContent = data[i].item_name;

                //The quantity of the requested item
                const requestedQuantity = document.createElement("td");
                requestedQuantity.textContent = data[i].quantity;

                //The time when the request was generated
                const createdAt = document.createElement("td");
                createdAt.textContent = data[i].requested_at;

                //Accept request button
                const acceptButton = document.createElement("button");
                acceptButton.type = "button";
                acceptButton.className = "btn btn-success";
                acceptButton.textContent = "Accept";
                acceptButton.onclick = ()=>{acceptRequest(data[i].id, data[i].item_name, data[i].quantity)}

                //Accept request button
                const rejectButton = document.createElement("button");
                rejectButton.type = "button";
                rejectButton.className = "btn btn-danger";
                rejectButton.textContent = "Reject";
                rejectButton.onclick = ()=>{rejectRequest(data[i].id)}

                tR.appendChild(rowCount);
                tR.appendChild(itemName);
                tR.appendChild(requestedQuantity);
                tR.appendChild(createdAt);
                tR.appendChild(acceptButton);
                tR.appendChild(rejectButton);
                    
                tBody.appendChild(tR);
            }
        })
    }

    function markRequest(id, mark){ //This function is used to mark a request as either accepted or rejected
        //The mark in parameter can either be accepted or rejected
        var response = null;

        fetch("http://sdclb-108821170.us-east-1.elb.amazonaws.com/inventory/markPendingRequest", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: id, mark: mark})
        })
        .then((res)=> {return res.text();})
        .then((textRes)=> {
            response = textRes;
            return response; //Can be either success or failure
        })
    }

    function acceptRequest(id, itemName, itemQuantity){ //This function runs when user clicks on Accept button

        markRequest(id, "Accepted"); //Mark the inventory request as accepted

        fetch("http://sdclb-108821170.us-east-1.elb.amazonaws.com/inventory/addInventoryItem", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({itemName: itemName, itemQuantity: itemQuantity})
        })
        .then((res)=> {return res.text();})
        .then((textRes)=> {
            if (textRes == "item_updated"){ //The item will always be updated, because sub manager does not have permission to request a new item
                window.alert("Request has been accepted! Inventory has been updated!");
                window.location.reload();
            }
        })
    }

    function rejectRequest(id){ //Just marks the request as rejected
        markRequest(id, "Rejected");
        window.alert("Request has been rejected");
        window.location.reload();
    }

    fetchPendingRequestsFromDB(); //Run this function as soon as the page loads, and fetch only pending requests
    // ..from DB and display them inside the table

    return(
        <>
            <Navbar pageType="Inventory Requests" />
            <table className="table" id="superM-handlePendingInventoryRequests-tableHead">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item Name</th>
                    <th scope="col">Requested Quantity</th>
                    <th scope="col">Requested At</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody id="superM-handlePendingInventoryRequests-tableBody">
                </tbody>
            </table>
        </>
    )
}

export default Handle_Pending_Requests;