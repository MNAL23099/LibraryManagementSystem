import { useEffect, useState } from "react";
import Navbar from "../Nav/Navbar";
import Handle_User_Permission from "../Shared_Functions/Sessions_Functions";

function Website_Admin_View_Accounts(){

    useEffect(()=>{fetchAccountsFromDB()}, []);
    const [accounts, setAccounts] = useState([]);

    function fetchAccountsFromDB(){ //This function will fetch the requests from the database, only those requests will be fetched which are marked as pending
    //..and then they will be displayed in the table

        fetch("http://sdclb-108821170.us-east-1.elb.amazonaws.com/accounts/fetchAccounts", {
            method: "GET",
        })
        .then((res)=> {return res.json()})
        .then((data)=> {
            setAccounts(data);
        })
    }

    function terminateAccount(targetEmail){ //This function gets called when user clicks on terminate account
        fetch("http://sdclb-108821170.us-east-1.elb.amazonaws.com/accounts/terminateAccount", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: targetEmail})
        })
        .then((res)=> {return res.text();})
        .then((textRes)=> {
            if (textRes == "success"){
                window.alert("Account has been terminated");
            }
            else if (textRes == "failure"){
                window.alert("Issue in terminating the account!");
            }
            window.location.reload();
        })
    }

    function restoreAccount(targetEmail){ //This function gets called when user clicks on Restore account
        fetch("http://sdclb-108821170.us-east-1.elb.amazonaws.com/accounts/restoreAccount", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: targetEmail})
        })
        .then((res)=> {return res.text();})
        .then((textRes)=> {
            if (textRes == "success"){
                window.alert("Account has been restored");
            }
            else if (textRes == "failure"){
                window.alert("Issue in restoring the account!");
            }
            window.location.reload();
        })
    }

    return(
        <>
            <Handle_User_Permission webpageRole={"website_admin"}>

            <Navbar pageType="View & Manage Accounts"/>

            <table className="table" id="websiteAdmin-viewAccounts-tableHead">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody id="websiteAdmin-viewAccounts-tableBody">
                {accounts.map((acc, index)=>{
                    return(
                        <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{acc.name}</td>
                        <td>{acc.email}</td>
                        <td>{acc.role}</td>
                        <td>{acc.account_status}</td>
                        <td><button className="btn btn-danger" onClick={()=>terminateAccount(acc.email)} disabled={acc.email === "website_admin@itu.edu.pk"}>Terminate Account</button></td>
                        <td><button className="btn btn-success" onClick={()=>restoreAccount(acc.email)} disabled={acc.email === "website_admin@itu.edu.pk"}>Restore Account</button></td>
                    </tr>
                    );
                })}
                </tbody>
            </table>

            </Handle_User_Permission>
        </>
    );
}

export default Website_Admin_View_Accounts;