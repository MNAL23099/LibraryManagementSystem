const connectToDB = require("./models/setupDB");
const fs = require("fs").promises;

async function getCurrentSession(){ //Return the email of the person currently signed in

  const filePath = "./userData/current_session.txt";

  try {
    const data = await fs.readFile(filePath, "utf-8");
    console.log(`Current session:  ${data}`);
    return data;
  }
  catch (error){
    console.log("Issue in loading current session");
    console.log(error.message);
    return;
  }

}

async function getLabName(){ //Return the lab assigned to the person currently logged in to the website
  const lsmClient = await connectToDB();

  const currentSessionMail = await getCurrentSession();
  
  try {
    //Check inside DB that which lab is assigned to currentSessionMail
    let query = `SELECT lab_name FROM assigned_labs WHERE lab_eng_mail = $1`;

    const data = await lsmClient.query(query, [currentSessionMail]);
    if (data.rowCount == 0){
      console.log("No lab found for the currently logged in lab engineer!");
      return;
    }
    return data.rows[0].lab_name;
  }
  catch (error){
    console.log(`error: getLabName() -> ${error.message}`);
    return;
  }
  
}

async function addUserAccount(name, email, pass, role){ //Whenver a user is neended to be added to the accounts table (his account is being created)
  //..this function is called

  const lmsClient = await connectToDB();
  const query = `INSERT INTO accounts(name, email, password, role, account_status)
  VALUES($1, $2, $3, $4, $5)`;

  try{
    await lmsClient.query(query, [name, email, pass, role, "Active"]); //By default the status of each account will be active, 
    // website admin has the permission to block any account
  }
  catch(error) {
    console.log(`sharedFunctions.js -> addUserAccount() -> ${error.message}`);
  }
  
}

async function editAccountEmail(currentEmail, newEmail){ //Returns true if the edit was successful, returns false if no such account with
  //..this email exists or some other error occured

  const lmsClient = await connectToDB();
  const query1 = `SELECT * FROM accounts WHERE email = $1`;
  try{
    const data1 = await lmsClient.query(query1, [currentEmail]);
    if (data1.rowCount == 0){ //If no such account exists then return false
      return false;
    } 

    const query2 = `UPDATE accounts SET email = $1 WHERE email = $2`;
    lmsClient.query(query2, [newEmail, currentEmail]);
    return true;
  }
  catch(error) {
    console.log(`sharedFunctions.js -> editAccountEmail() -> ${error.message}`);
    return false;
  }
}

async function editAccountRole(targetEmail, newRole){ //Returns true if the edit was successful, returns false if no such account with
  //..this email exists or some other error occured
  const lmsClient = await connectToDB();
  const query1 = `SELECT * FROM accounts WHERE email = $1`;
  try{
    const data1 = await lmsClient.query(query1, [targetEmail]);
    if (data1.rowCount == 0){ //If no such account exists then return false
      return false;
    } 

    const query2 = `UPDATE accounts SET role = $1 WHERE email = $2`;
    lmsClient.query(query2, [newRole, targetEmail]);
    return true;
  }
  catch(error) {
    console.log(`sharedFunctions.js -> editAccountRole() -> ${error.message}`);
    return false;
  }

}

async function editAccountPassword(targetEmail, newPassword){ //Returns true if the edit was successful, returns false if no such account with
  //..this email exists or some other error occured
  const lmsClient = await connectToDB();
  const query1 = `SELECT * FROM accounts WHERE email = $1`;
  try{
    const data1 = await lmsClient.query(query1, [currentEmail]);
    if (data1.rowCount == 0){ //If no such account exists then return false
      return false;
    } 

    const query2 = `UPDATE accounts SET password = $1 WHERE email = $2`;
    lmsClient.query(query2, [newPassword, targetEmail]);
    return true;
  }
  catch(error) {
    console.log(`sharedFunctions.js -> editAccountPassword() -> ${error.message}`);
    return false;
  }
}

async function editAccountStatus(targetEmail, newStatus){ //Returns true if the edit was successful, returns false if no such account with
  //..this email exists or some other error occured
  const lmsClient = await connectToDB();
  const query1 = `SELECT * FROM accounts WHERE email = $1`;
  try{
    const data1 = await lmsClient.query(query1, [targetEmail]);
    if (data1.rowCount == 0){ //If no such account exists then return false
      return false;
    } 

    const query2 = `UPDATE accounts SET account_status = $1 WHERE email = $2`;
    lmsClient.query(query2, [newStatus, targetEmail]);
    return true;
  }
  catch(error) {
    console.log(`sharedFunctions.js -> editAccountStatus() -> ${error.message}`);
    return false;
  }
}

async function removeUserAccount(targetEmail){ //This function removes the desired user account from accounts table

  const lmsClient = await connectToDB();
  const query1 = `SELECT * FROM accounts WHERE email = $1`;
  const query2 = `DELETE FROM accounts WHERE email = $1`;

  try{
    const data1 = await lmsClient.query(query1, [targetEmail]);
    if (data1.rowCount == 0){ //If no such account exists then return false
      return false;
    }

    await lmsClient.query(query2, [targetEmail]);
    return true;
  }
  catch(error) {
    console.log(`sharedFunctions.js -> removeUserAccount() -> ${error.message}`);
    return false;
  }
}

async function editAccountName(targetEmail, newName){
  const lmsClient = await connectToDB();
  const query1 = `SELECT * FROM accounts WHERE email = $1`;
  try{
    const data1 = await lmsClient.query(query1, [targetEmail]);
    if (data1.rowCount == 0){ //If no such account exists then return false
      return false;
    } 

    const query2 = `UPDATE accounts SET name = $1 WHERE email = $2`;
    lmsClient.query(query2, [newName, targetEmail]);
    return true;
  }
  catch(error) {
    console.log(`sharedFunctions.js -> editAccountName() -> ${error.message}`);
    return false;
  }
}

async function accountAlreadyExists(targetEmail){ //Return true if an account on this email already exists

  const lmsClient = await connectToDB();
  const query = `SELECT * FROM accounts WHERE email = $1`;

  try {
    const data = await lmsClient.query(query, [targetEmail]);
    if (data.rowCount == 0){
      return false;
    }
    else return true;
  }
  catch(error) {
    console.log(`sharedFunctions.js -> accountAlreadyExists() -> ${error.message}`);
    return true;
  }
}

async function terminateUserAccount(targetEmail){ //Return true if account has been terminated successfully

  const lmsClient = await connectToDB();
  const query = `SELECT * FROM accounts WHERE email = $1`;

  try {
    const data = await lmsClient.query(query, [targetEmail]);
    if (data.rowCount == 0){ //Return false if no such account exists
      return false;
    }
    
    const query1 = `UPDATE accounts SET account_status = $1 WHERE email = $2`;
    await lmsClient.query(query1, ["Termiated", targetEmail]);
    return true;
  }
  catch(error) {
    console.log(`sharedFunctions.js -> terminateAccount() -> ${error.message}`);
    return false;
  }
}

async function restoreUserAccount(targetEmail){ //Return true if account has been restored successfully
  
  const lmsClient = await connectToDB();
  const query = `SELECT * FROM accounts WHERE email = $1`;

  try {
    const data = await lmsClient.query(query, [targetEmail]);
    if (data.rowCount == 0){ //Return false if no such account exists
      return false;
    }
    
    const query1 = `UPDATE accounts SET account_status = $1 WHERE email = $2`;
    await lmsClient.query(query1, ["Active", targetEmail]);
    return true;
  }
  catch(error) {
    console.log(`sharedFunctions.js -> restoreAccount() -> ${error.message}`);
    return false;
  }
}

module.exports = {
  getCurrentSession,
  getLabName,
  addUserAccount,
  editAccountEmail,
  editAccountPassword,
  editAccountRole,
  editAccountStatus,
  removeUserAccount,
  editAccountName,
  accountAlreadyExists,
  terminateUserAccount,
  restoreUserAccount,
}