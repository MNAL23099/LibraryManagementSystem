const { sendNotification } = require("../AWS/SNS/SNS");
const connectToDatabase = require("../models/setupDB");

//View Book Catalog Controller for Customer Starts Here//
async function viewBookCatalog(req, res){
    try{
        const library_db = await connectToDatabase();
        const query = `SELECT * FROM library`;
        const data = await library_db.query(query);
        res.json(data.rows);
    }
    catch(error){
        console.log(`customerController.js -> viewBookCatalog: ${error.message}`);
    }
}

async function borrowBook(req, res){
    const {bookISBN} = req.body;

    //Make sure user has sent all the input
    if (!bookISBN){res.write("empty_input_fields");}

    try{
        const library_db = await connectToDatabase();

        //If the requested book is not in sufficient quantity, then return failure
        if (!await checkBookQuantity(bookISBN)){
            res.write("book_is_out_of_stock");
            res.end();
            return;
        }

        //If the same user is requesting the same book again even he already has an ongoing borrow for this book, then return failure
        if (await hasBookAlreadyBeenRequested(bookISBN, req.session.user.email)){
            res.write("borrow_already_in_progress");
            res.end();
            return;
        }
        
        //When the request is being made, we'll send null for borrow_date_time because that date and time will be
        //..put when the staff has actually accepted the request to borrow the book, also, we'll send null for
        //..deadline_date too, this will also be set when staff accepts the request

        //If everything is fine then run the query
        const query = `INSERT INTO borrowed_books(book_isbn, borrow_date, customer_email, borrow_completed
        ,borrow_approved_by_staff, deadline_date) 
        VALUES($1, $2, $3, $4, $5, $6)`;
        await library_db.query(query, [bookISBN, null, req.session.user.email, "NO", "PENDING", null]);
        await sendNotification(req.session.user.email, "Book borrow request recorded", `Your request to borrow the book with ISBN: ${bookISBN} has been recorded successfully! You will be alerted about the further processing of your request!`);
        res.write("success");
        res.end();
    }
    catch(error){
        console.log(`customerController.js -> borrowBook: ${error.message}`);
    }
}

async function checkBookQuantity(book_isbn){ //Validate if the book is in stock or not

    try{
        const library_db = await connectToDatabase();
        const query = `SELECT quantity FROM library WHERE isbn = $1`;
        const rawData = await library_db.query(query, [book_isbn]);
        if (rawData.rows[0].quantity > 0){return true;}
        else return false;
    }
    catch(error){console.log(`customerController.js -> checkBookQuantity: ${error.message}`);}
}

async function hasBookAlreadyBeenRequested(book_isbn, customer_email){ //Check if the same user already has a pending request for borrowing
    //..this book, if yes then return true, otherwise false

    try{
        const library_db = await connectToDatabase();

        const query = `SELECT * FROM borrowed_books WHERE book_isbn = $1 AND customer_email = $2 AND borrow_completed = $3 AND (borrow_approved_by_staff = $4 OR borrow_approved_by_staff = $5)`;
        const rawData = await library_db.query(query, [book_isbn, customer_email, "NO", "PENDING", "ACCEPTED"]);
        if (rawData.rows.length > 0){
            return true;
        }
        else return false;
    }
    catch(error){console.log(`customerController.js -> hasBookAlreadyBeenRequested: ${error.message}`);}

}

//View Book Catalog Controller for Customer Ends Here//

//View Borrowed Books Controller for Customer Starts Here//

async function viewBorrowedBooks(req, res){

    try{
        const library_db = await connectToDatabase();
        const customer_email = req.session.user.email;

        const query = `SELECT * 
        FROM borrowed_books
        JOIN library
        ON borrowed_books.book_isbn = library.isbn
        WHERE borrowed_books.customer_email = $1`;

        const data = await library_db.query(query, [customer_email]);
        res.json(data);
    }
    catch(error){
        console.log(`customerController.js -> viewBorrowedBooks: ${error.message}`);
    }
}

//View Borrowed Books Controller for Customer Ends Here//

module.exports = {
    viewBookCatalog,
    borrowBook,
    viewBorrowedBooks,
};