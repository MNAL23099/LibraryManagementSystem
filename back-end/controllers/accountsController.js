const connectToDB = require("../models/setupDB.js");
const {addUserAccount, accountAlreadyExists, terminateUserAccount, restoreUserAccount} = require("../sharedFunctions.js")
const {sendNotification, addSubscriber} = require("../AWS/SNS/SNS.js");

//-------------Website Admin Add Account Starts Here------------------------//

async function addAccount(req, res){

    const {name, email, role} = req.body;

    //Make sure that the entries exist
    if (!name || !email || !role){
        res.write("missing_entries");
        res.end();
        return;
    }

    //Make sure that account on this email doesn't already exist
    if (await accountAlreadyExists(email)){
        res.write("email_already_stored");
        res.end();
        return;
    }

    //If everything is fine then add this user account
    await addUserAccount(name, email, "123", role);
    await addSubscriber(email);
    res.write("new_row_added");
    res.end();
}

//-------------Website Admin Add Account Ends Here------------------------//

//-------------Website Admin View & Handle Accounts Starts Here------------------------//

async function getAccounts(req, res){ //Return all the accounts from accounts table 

    const lmsClient = await connectToDB();
    const query = `SELECT * FROM accounts`;

    try {
        const data = await lmsClient.query(query);
        if (data.rowCount > 0){
            res.json(data.rows);
        }
    }
    catch(error) {
        console.log(`accountsController.js -> getAccounts -> ${error.message}`);
        return;
    }

}

async function terminateAccount(req, res){

    const {email} = req.body;

    if (await terminateUserAccount(email)){
        await sendNotification(email, "Account Termination", "Your account has been terminated from library management system! You can no longer log in");
        res.write("success");
        res.end();
    }
    else {
        res.write("failure");
        res.end();
    }
}

async function restoreAccount(req, res){

    const {email} = req.body;

    if (await restoreUserAccount(email)){
        await sendNotification(email, "Account Restoration", "Your account has been restored for library management system website! You can now log in!");
        res.write("success");
        res.end();
    }
    else {
        res.write("failure");
        res.end();
    }
}

//-------------Website Admin View & Handle Accounts Ends Here------------------------//

module.exports = {
    addAccount,
    getAccounts,
    terminateAccount,
    restoreAccount,
}