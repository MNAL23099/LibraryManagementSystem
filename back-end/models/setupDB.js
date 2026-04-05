const { Client } = require("pg");

//indicator that tells if the lmsClient has already been made or not
let lmsClient = null;

async function connectToDatabase() {

    if (lmsClient){ //If the lms client was already made then return it
        return lmsClient;
    }

    // const client = new Client({
    //     user: "superdeveloper",
    //     host: "localhost",
    //     password: "123",
    //     database: "library_db", //Directly connect to library_db
    //     port: "5432"
    // });
    try{
        // await client.connect();
        // console.log("Default database connected!");
        // //If connection to the database is successful then connect to library_db
    
        // //First check if library_db already exists or not
        // const query_CheckDatabaseValidity = `SELECT 1 from pg_database WHERE datname = 'library_db'`;
        // const response = await client.query(query_CheckDatabaseValidity);

        // if (response.rowCount == 0){ //If library_db doesn't exist
        //     console.log(response.rowCount);
        //     const query_createDB_LMS = `CREATE DATABASE library_db`;
        //     await client.query(query_createDB_LMS);
        // }
        
        // //Then end the current database connection (current is default postgres)
        // await client.end();
        // try{
        //     const newClient = await connectToLibrary_db();
        //     return newClient;
        // }
        // catch(error){
        //     return null;
        // }

        const newClient = await connectToLibrary_db();
        return newClient;
    }
    catch (error){
        console.log("Issue in connection to default database!");
        console.log(error.message);
        return null;
        //Return null if there is no client to return
    }
}

async function connectToLibrary_db(){ //Connect to library_db database

    //Create a new client
    const newClient = new Client({
        user: "master",
        host: "sdcprojectrds.cpfdu0lrzhyb.us-east-1.rds.amazonaws.com",
        password: "manalumar44",
        database: "library_db",
        port: "5432",
        ssl: {
        rejectUnauthorized: false // allows self-signed RDS cert
        }
    });
    try{
        await newClient.connect();
        console.log("Connected to library_db");
        lmsClient = newClient;
        return newClient;
    }
    catch (error){
        console.log("Issue in connecting to library_db");
        console.log(error.message);
        return null;
    }
}

module.exports = connectToDatabase;