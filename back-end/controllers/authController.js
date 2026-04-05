const { stat } = require("fs");
const connectToDatabase = require("../models/setupDB"); //Import the lms client for our database
const {addSubscriber} = require("../AWS/SNS/SNS.js");
const write_file = require ("fs").promises;


// Sign Up logic, this function runs when /signup of backend is accessed
async function signUpUser(req, res) {
  
  const lmsClient = await connectToDatabase(); //Get the lmsClient

  //Import the json from request
  const { username, password, accountType, email } = req.body;

  //Only proceed if username, password, accountType and email are present
  if (username && password && accountType && email){
    if (await userAlreadyExists(email) == true){ //If user already exists then don't add him in db, otherwise do
      console.log("Sign up user already exists!");
      res.write("user_already_exists");
      res.end();
      return;
    }
    const query = `INSERT INTO accounts(name, email, password, role, account_status)
    VALUES($1, $2, $3, $4, $5)`;

    try{ //Try to add the user to database
      await lmsClient.query(query, [username, email, password, accountType, "Active"]);
      await addSubscriber(email);
      console.log("User has been added to db!");
      res.write("success");
      res.end();
    }
    catch (error){
      console.log("Error in putting signed up user to the database");
      console.log(error.message);
    }

  }
  else {
    console.log("User did not fill all fields of sign up form");
    res.write("missing_entries"); //Return this response to the frontend
    res.end();
  }

};

async function userAlreadyExists(targetEmail){// This function returns true if the target email already exists
  const lmsClient = await connectToDatabase();

  try {
    const query_get_Users = `SELECT * FROM accounts`;
    const data = await lmsClient.query(query_get_Users);
    for(let i = 0; i < data.rows.length; i++){
      if (data.rows[i].email == targetEmail){
        return true; //If the email already exists inside db then return true
      }
    }
  }
  catch(error){
    console.log("error:userAlreadyExists()->");
    console.log(error.message);
  }

  return false; //User email was not found in db, return false
}
async function signInUser(req, res) {
  const { email, password } = req.body;

  if (!(await AllFilled(email, password))) {
    return res.json({ status: "missing_fields" });
  }

  try {
    const library_db = await connectToDatabase();
    const query = `SELECT email, password, account_status 
                   FROM accounts
                   WHERE email = $1 AND password = $2`;

    const variable = await library_db.query(query, [email, password]);

    if (variable.rows.length === 0) {
      return res.json({ status: "credentials_mismatch" });
    }

    const status = await getAccountStatus(email);
    if (status !== "Active") {
      return res.json({ status: "terminated" });
    }

    const role = await getAccountRole(email);
    await initializeUserSession(req, role, email);

    return res.json({ status: "success", role });
  } catch (error) {
    console.log(`error: authcontroller -> signinuser() -> ${error.message}`);
    return res.json({ status: "error" });
  }
}

async function getAccountRole(email) {
  try {
    const lmsdb = await connectToDatabase();
    const query = `SELECT role FROM accounts WHERE email = $1`;
    const data = await lmsdb.query(query, [email]);
   
    if(data.rows[0].role == 0){
      return null;
    }
    return data.rows[0].role;

  } catch (error) {
    console.log(`error: authcontroller -> getAccountRole() -> ${error.message}`);
    return null;
  }
}

async function getAccountStatus(email) {
  try {
    const lmsdb = await connectToDatabase();
    const query = `SELECT account_status FROM accounts WHERE email = $1`;
    const data = await lmsdb.query(query, [email]);

    if(data.rows[0].account_status == 0){
      return null;
    }
    return data.rows[0].account_status;

  } catch (error) {
    console.log(`error: authcontroller -> getAccountStatus() -> ${error.message}`);
    return null;
  }
}

async function AllFilled(email, password){
  if(!email || !password){
    return false;
  }
  return true;
}
async function initializeUserSession(req, role, email) {

  req.session.user = { role: role, email: email };
  console.log(`signed in session role: ${req.session.user.role}`);
  console.log(`signed in session email: ${req.session.user.email}`);
  req.session.save(() => { console.log("session saved!"); });
  return true;
}

module.exports = {signUpUser, signInUser};
