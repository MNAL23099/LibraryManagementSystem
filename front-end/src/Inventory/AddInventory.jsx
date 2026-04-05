import { useState } from "react";
import Navbar from "../../../Nav/Navbar";

function AddInventory(){

    const [itemName, setItemName] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");

    function submitForm(e){
        e.preventDefault();
    
        fetch("http://sdclb-108821170.us-east-1.elb.amazonaws.com/inventory/addInventoryItem", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({itemName: itemName, itemQuantity: itemQuantity}),
        })
        .then((response)=>{return response.text()})
        .then((textResponse)=>{
            if (textResponse == "missing_entries"){
                window.alert("Please fill all entries!");
            }
            else if (textResponse == "new_item_added"){
                window.alert("New item detected! It has been added");
            }
            else if (textResponse == "item_updated"){
                window.alert("Item already exists! Quantity has been updated!");
            }
            else if (textResponse == "failure"){
                window.alert("Unexpected error occured! Please contact the developers!");
            }
            window.location.reload(); //Reload the window
        }
    );
    }

    return(
        <>
        <Navbar pageType="Add Inventory Item"/>

        <div id="addInventory-div_1" style={{
            minHeight: "100vh",
            background: "var(--bg-1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
        <form onSubmit={submitForm} id="inventory-div_1-form_1" style={{
            background: "var(--card-bg)",
            borderRadius: "18px",
            boxShadow: "0 8px 32px 0 rgba(26,26,26,0.10), 0 2px 8px 0 rgba(26,26,26,0.06)",
            padding: "2rem 2.2rem",
            maxWidth: "370px",
            width: "100%",
            border: "1px solid var(--primary)",
            color: "var(--text)"
        }}>
        <h2 style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "var(--primary)",
            fontWeight: 800,
            letterSpacing: "1px",
            fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif"
        }}>Add Inventory Item</h2>
        <div className="mb-3">
            <label htmlFor="add-inventory-item-name" className="form-label" style={{fontWeight: 500, color: 'var(--primary)'}}>Item Name</label>
            <input onChange={(e)=>{setItemName(e.target.value)}} type="text" className="form-control" id="add-inventory-item-name" style={{borderRadius: "8px", background: 'var(--card-bg)', color: 'var(--primary)', border: '1px solid rgba(0,36,107,0.12)'}} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text" style={{color: 'var(--muted)'}}>For example: PC, Circuit board, etc.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="add-inventory-quantity" className="form-label" style={{fontWeight: 500, color: 'var(--primary)'}}>Quantity</label>
            <input onChange={(e)=>{setItemQuantity(e.target.value)}} type="number" className="form-control" id="add-inventory-quantity" style={{borderRadius: "8px", background: 'var(--card-bg)', color: 'var(--primary)', border: '1px solid rgba(0,36,107,0.12)'}} />
        </div>
        <button type="submit" className="inventory-go-btn w-100" style={{
            borderRadius: "25px",
            fontWeight: 700,
            fontSize: "1.1rem",
            background: 'linear-gradient(90deg, var(--section-bg) 0%, var(--bg-1) 100%)',
            color: "var(--primary)",
            border: "none",
            boxShadow: "0 8px 20px rgba(26,26,26,0.08)",
            padding: "0.7rem 0",
            marginTop: "1rem"
        }}>Submit</button>
        </form>
        </div>
        </>
    );
}

export default AddInventory;