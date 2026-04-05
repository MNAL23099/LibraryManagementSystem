const connectoToDB = require("./setupDB.js");

async function createTables(){
    // await createTable_Users(); //This table has been replaced by accounts
    // await createTable_assigned_labs();
    // await createTable_current_session();
    // await createTable_inventory();
    // await createTable_lab_staff();
    // await createTable_university_staff();
    // await createTable_labs();
    // await createTable_Courses();
    // await createTable_free_inventory();
    // await createTable_inventory_requests(); 
    // await createTable_Assigned_Courses();
    await createTable_accounts();
    // await createTable_faculties();
    await createTable_Library();
    await createTable_borrowed_books();
    await insertDummyData();
}

async function createTable_borrowed_books(){
    const library_db = await connectoToDB();

    //borrow_completed tells if the book has been returned after being borrowed or not, its values can either be
    //..NO or NO
    //When a user requests to borrow a book, that borrow has to be accepted by staff, if staff has accepted the borrow
    //..then borrow_approved_by_staff becomes ACCEPTED, otherwise it remains PENDING by default, if staff rejects the borrow
    //..then it becomes REJECTED
    try{
        const query = `CREATE TABLE IF NOT EXISTS borrowed_books (
        borrow_id SERIAL PRIMARY KEY,
        book_isbn VARCHAR(50),
        borrow_date DATE,
        customer_email VARCHAR(250),
        borrow_completed VARCHAR(3),
        borrow_approved_by_staff VARCHAR(25),
        deadline_date DATE
        )`;
        await library_db.query(query);
        console.log(`Table: borrowed_books has been created!`);
    }
    catch(error){
        console.log(`allTables.js -> createTable_borrowed_books: ${error.message}`);
    }
}

async function createTable_Library(){
    const client = await connectoToDB();
    if (!client) {
        return;
    }

    const query = `
        CREATE TABLE IF NOT EXISTS library (
            id SERIAL PRIMARY KEY,
            book_name VARCHAR(150),
            author VARCHAR(150),
            isbn VARCHAR(50),
            quantity INT
        )
    `;

    client.query(query, (err, data) => {
        if (err) {
            console.log("Library table cannot be created!");
            console.log(err.message);
        } else {
            console.log("Library table created!");
        }
    });
}


async function createTable_Assigned_Courses(){
    const client = await connectoToDB();
    if (!client) {
        return;
    }
    const query = `CREATE TABLE IF NOT EXISTS assicourses (
        id SERIAL PRIMARY KEY,
        course_name VARCHAR(100),
        lab VARCHAR(100),
        labEngineer VARCHAR(100),
        BatchNumber VARCHAR(100)
    )`;
    client.query(query, (err, data) => {
        if (err) {
            console.log("AssignedCourses table cannot be created!");
            console.log(err.message);
        } else {
            console.log("AssignedCourses table created!");
        }
    });
}

async function createTable_accounts(){ //This table stores all the accounts created on the website, from website admin to lab super manager and students
    const client = await connectoToDB();
    if (!client) {
        return;
    }
    const query = `CREATE TABLE IF NOT EXISTS accounts (
        name VARCHAR(100),
        email VARCHAR(100) PRIMARY KEY,
        password VARCHAR(100),
        role VARCHAR(100),
        account_status VARCHAR(100)
    )`;
    client.query(query, (err, data) => {
        if (err) {
            console.log("accounts table cannot be created!");
            console.log(err.message);
        } else {
            console.log("accounts table created!");
        }
    });
}

async function createTable_Courses(){
    const client = await connectoToDB();
    if (!client) {
        return;
    }
    const query = `CREATE TABLE IF NOT EXISTS Courses (
        id SERIAL PRIMARY KEY,
        course_name VARCHAR(100)
    )`;
    client.query(query, (err, data) => {
        if (err) {
            console.log("Courses table cannot be created!");
            console.log(err.message);
        } else {
            console.log("Courses table created!");
        }
    });
}

// Standalone function to create labs table
async function createTable_labs(){
    // This table stores labs with id and lab_name
    const client = await connectoToDB();
    if (!client){
        return;
    }
    const query_MakeTable_labs = `CREATE TABLE IF NOT EXISTS labs
      (id SERIAL PRIMARY KEY,
      lab_name VARCHAR(100))`;
    client.query(query_MakeTable_labs, (err, data) => {
        if (err) {
            console.log("labs table can not be created!");
            console.log(err.message);
        }
        else {
            console.log("labs table created!");
        }
    });
}

async function createTable_Users(){

    const client = await connectoToDB();
    if (!client){ //If client was not returned then just return
        return;
    }
    
    const query_MakeTable_Users = `CREATE TABLE IF NOT EXISTS Users
      (ID SERIAL PRIMARY KEY, 
      Name VARCHAR(100), 
      Password VARCHAR(100), 
      Account_Type VARCHAR(100), 
      Email VARCHAR(100))`;

    client.query(query_MakeTable_Users, (err, data) => {
        if (err) {
            console.log("User Table can not be created!");
            console.log(err.message);
        }
        else {
            console.log("Users table created!");
        }
    });
}

async function createTable_free_inventory(){

    const client = await connectoToDB();
    if (!client){ //If client was not returned then just return
        return;
    }
    
    const query_MakeTable_Users = `CREATE TABLE IF NOT EXISTS free_inventory
      (ID SERIAL PRIMARY KEY, 
        item_name VARCHAR(100),
        item_quantity INT)`;

    client.query(query_MakeTable_Users, (err, data) => {
        if (err) {
            console.log("free_inventory table can not be created!");
            console.log(err.message);
        }
        else {
            console.log("free_inventory table created!");
        }
    });
}

async function createTable_assigned_labs(){ //This Table tells which lab engineer is assigned to
    //which lab

    const client = await connectoToDB();
    if (!client){ //If client was not returned then just return
        return;
    }
    
    const query_MakeTable_Users = `CREATE TABLE IF NOT EXISTS assigned_Labs
      (id SERIAL PRIMARY KEY, 
      lab_name VARCHAR(100), 
      lab_eng_mail VARCHAR(100),
      lab_ass_mail VARCHAR(100),
      lab_tec_mail VARCHAR(100))`;

    client.query(query_MakeTable_Users, (err, data) => {
        if (err) {
            console.log("Assigned_Labs Table can not be created!");
            console.log(err.message);
        }
        else {
            console.log("Assigned_Labs table created!");
        }
    });

}

//Insert dummy data that is supposed to be received from another database
async function insertDummyData(){ //This function adds dummy data inside and university_staff

    const lmsClient = await connectoToDB();

    // //Add a lab engineer to university_staff
    // let query_dummyData_university_staff = 'SELECT * FROM university_staff WHERE email = $1';
    // const targetValue = "kashif@itu.edu.pk";
    // const data_1 = await lmsClient.query(query_dummyData_university_staff, [targetValue]);
    // if (data_1.rowCount == 0){
    //     query_dummyData_university_staff = `INSERT INTO university_staff(name, email, role)
    //     VALUES($1, $2, $3)`;
    //     try{
    //         const name = "Kashif";
    //         const email = "kashif@itu.edu.pk";
    //         const role = "lab_engineer";
    //         lmsClient.query(query_dummyData_university_staff, [name, email, role]);
    //         console.log("univeristy_staff dummy data done!");
    //     }
    //     catch (error){
    //         console.log("Issue in adding dummy data to university_staff");
    //         console.log(error.message);
    //     }
    // }
    // else {
    //     console.log("Dummy data of university_staff done!");
    // }

    // //Add a lab technician to university_staff
    // let query_dummyData_university_staff_2 = 'SELECT * FROM university_staff WHERE email = $1';
    // const targetValue_2 = "usman@itu.edu.pk";
    // const data_2 = await lmsClient.query(query_dummyData_university_staff_2, [targetValue_2]);
    // if (data_2.rowCount == 0){
    //     query_dummyData_university_staff_2 = `INSERT INTO university_staff(name, email, role)
    //     VALUES($1, $2, $3)`;
    //     try{
    //         const name = "Usman";
    //         const email = "usman@itu.edu.pk";
    //         const role = "lab_technician";
    //         lmsClient.query(query_dummyData_university_staff_2, [name, email, role]);
    //     }
    //     catch (error){
    //         console.log("Issue in adding dummy data to university_staff");
    //         console.log(error.message);
    //     }
    // }

    // //Add a lab assistant to university_staff
    // let query_dummyData_university_staff_3 = 'SELECT * FROM university_staff WHERE email = $1';
    // const targetValue_3 = "ali@itu.edu.pk";
    // const data_3 = await lmsClient.query(query_dummyData_university_staff_3, [targetValue_3]);
    // if (data_3.rowCount == 0){
    //     query_dummyData_university_staff_3 = `INSERT INTO university_staff(name, email, role)
    //     VALUES($1, $2, $3)`;
    //     try{
    //         const name = "Ali";
    //         const email = "ali@itu.edu.pk";
    //         const role = "lab_assistant";
    //         lmsClient.query(query_dummyData_university_staff_3, [name, email, role]);
    //     }
    //     catch (error){
    //         console.log("Issue in adding dummy data to university_staff");
    //         console.log(error.message);
    //     }
    // }

    //Add 1 website admin account in accounts
    let query_dummyData_accounts = 'SELECT * FROM accounts WHERE email = $1';
    const targetValue_4 = "website_admin@itu.edu.pk";
    const data_4 = await lmsClient.query(query_dummyData_accounts, [targetValue_4]);
    if (data_4.rowCount == 0){
        query_dummyData_accounts = `INSERT INTO accounts(email, password, role, account_status, name)
        VALUES($1, $2, $3, $4, $5)`;
        try{
            const email = "website_admin@itu.edu.pk";
            const role = "website_admin";
            lmsClient.query(query_dummyData_accounts, [email, "123", role, "Active", "Website Admin"]);
        }
        catch (error){
            console.log("Issue in adding dummy data to accounts");
            console.log(error.message);
        }
    }
}

async function createTable_current_session(){ //This table stores the ID of the person that is currently
    //signed into the website. This table is supposed to have just one row

    const client = await connectoToDB();
    if (!client){ //If client was not returned then just return
        return;
    }
    
    const query_MakeTable_current_session = `CREATE TABLE IF NOT EXISTS current_session
      (email VARCHAR(100) PRIMARY KEY)`;

    client.query(query_MakeTable_current_session, (err, data) => {
        if (err) {
            console.log("current_session table can not be created!");
            console.log(err.message);
        }
        else {
            console.log("current_session table created!");
        }
    });
}

async function createTable_inventory(){ //This table stores the inventory item name and its quantity
    //it also stores which lab has that inventory item

    const client = await connectoToDB();
    if (!client){ //If client was not returned then just return
        return;
    }
    
    const query_MakeTable_current_session = `CREATE TABLE IF NOT EXISTS inventory
      (ID SERIAL PRIMARY KEY,
      name VARCHAR(100),
      quantity INT,
      lab_name VARCHAR(100))`;

    client.query(query_MakeTable_current_session, (err, data) => {
        if (err) {
            console.log("inventory table can not be created!");
            console.log(err.message);
        }
        else {
            console.log("inventory table created!");
        }
    });
}

async function createTable_lab_staff(){ //This table stores the inventory item name and its quantity
    //it also stores which lab has that inventory item

    const client = await connectoToDB();
    if (!client){ //If client was not returned then just return
        return;
    }
    
    const query_MakeTable_current_session = `CREATE TABLE IF NOT EXISTS lab_staff
      (id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100),
      designation VARCHAR(100),
      lab_name VARCHAR(100))`;

    client.query(query_MakeTable_current_session, (err, data) => {
        if (err) {
            console.log("lab_staff table can not be created!");
            console.log(err.message);
        }
        else {
            console.log("lab_staff table created!");
        }
    });
}

async function createTable_university_staff(){ //This table is filled by the university when they hire new staff, our job is not to hire people

    const client = await connectoToDB();
    if (!client){ //If client was not returned then just return
        return;
    }
    
    const query_MakeTable_current_session = `CREATE TABLE IF NOT EXISTS university_staff
      (id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100),
      role VARCHAR(100))`;

    client.query(query_MakeTable_current_session, (err, data) => {
        if (err) {
            console.log("university_staff table can not be created!");
            console.log(err.message);
        }
        else {
            console.log("university_staff table created!");
        }
    });


}

async function createTable_inventory_requests() {
    const client = await connectoToDB();
    if (!client) {
        return;
    }

    const query_MakeTable_inventory_requests = `
        CREATE TABLE IF NOT EXISTS inventory_requests (
            id SERIAL PRIMARY KEY,
            item_name TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            status TEXT DEFAULT 'Pending',
            requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    client.query(query_MakeTable_inventory_requests, (err, data) => {
        if (err) {
            console.log("inventory_requests table cannot be created!");
            console.log(err.message);
        } else {
            console.log("inventory_requests table created!");
        }
    });
}

async function createTable_faculties() {
    const client = await connectoToDB();
    if (!client) return;

    const query = `
        CREATE TABLE IF NOT EXISTS faculties (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    client.query(query, (err, data) => {
        if (err) {
            console.log("faculties table cannot be created!");
            console.log(err.message);
        } else {
            console.log("faculties table created!");
        }
    });
}
module.exports = createTables;


