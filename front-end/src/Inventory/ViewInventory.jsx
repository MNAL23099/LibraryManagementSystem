import Navbar from "../../../Nav/Navbar";

function fetch_data_inventory(){

    fetch("http://sdclb-108821170.us-east-1.elb.amazonaws.com/inventory/fetchFromInventoryDB")
    .then((res)=>{return res.json()})
    .then((res)=>{

        for(let i= 0; i<res.length; i++){
            const tableBody = document.getElementById("view_inventory_table_1");

            const tableRow = document.createElement("tr");
            const tablehead = document.createElement("th");
            tablehead.scope = "row";
            const tabledata = document.createElement("td");
            const tabledata_2 = document.createElement("td");

            tablehead.textContent = i+1;
            tabledata.textContent = res[i].item_name;
            tabledata_2.textContent = res[i].item_quantity;
            
            tableRow.appendChild(tablehead);
            tableRow.appendChild(tabledata);
            tableRow.appendChild(tabledata_2);
            tableBody.appendChild(tableRow);
        }})
    
}
export function ViewInventory() {
  return (
    <>
      <Navbar pageType="View Inventory" />
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody id="view_inventory_table_1">
          </tbody>
        </table>
      </div>
    </>

  );
}

fetch_data_inventory();
