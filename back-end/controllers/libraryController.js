const connectToDB = require("../models/setupDB.js");
const {sendNotification} = require("../AWS/SNS/SNS.js");

// ================= ADD BOOK =================
async function addBook(req, res){
  console.log("connection has been made to controller!");
  const { bookName, author, isbn, quantity } = req.body;

  if (!bookName || !author || !isbn || !quantity){
    res.send("missing_entries");
    return;
  }

  const client = await connectToDB();

  try{
    const check = await client.query(
      "SELECT * FROM library WHERE isbn = $1",
      [isbn]
    );

    if (check.rowCount > 0){
      await client.query(
        "UPDATE library SET quantity = quantity + $1 WHERE isbn = $2",
        [quantity, isbn]
      );
      res.send("book_updated");
    }
    else{
      await client.query(
        "INSERT INTO library (book_name, author, isbn, quantity) VALUES ($1,$2,$3,$4)",
        [bookName, author, isbn, quantity]
      );
      res.send("new_book_added");
    }
  }
  catch(err){
    console.log(err.message);
    res.send("failure");
  }
}

// ================= EDIT BOOK =================
async function editBooks(req, res){
  const client = await connectToDB();
  const data = await client.query("SELECT * FROM library");
  res.json(data.rows);
}

async function submitEditedBook(req, res){
  const { name, author, isbn, quantity, id } = req.body;

  if (!name || !author || !isbn || !quantity || !id){
    res.send("missing_entries");
    return;
  }

  const client = await connectToDB();
  await client.query(
    `UPDATE library 
     SET book_name=$1, author=$2, isbn=$3, quantity=$4 
     WHERE id=$5`,
    [name, author, isbn, quantity, id]
  );

  res.send("success");
}

async function deleteBook(req, res){
  const { id } = req.body;
  if (!id){
    res.send("missing_entries");
    return;
  }

  const client = await connectToDB();
  await client.query("DELETE FROM library WHERE id = $1", [id]);
  res.send("success");
}

// ================= VIEW BOOKS =================
async function viewLibrary(req, res){
  const client = await connectToDB();
  const data = await client.query("SELECT * FROM library");
  res.json(data.rows);
}

// ================= VIEW Borrowed BOOKS =================
async function viewBorrows(req, res){
  const client = await connectToDB();
  const data = await client.query("SELECT * FROM borrowed_books");
  res.json(data.rows);
}

// ================= Handle Borrow Completion =================
//Borrow completion means if book has been returned by the customer
async function handleBorrowCompletion(req, res){
  try{
    const {markValue, customer_email, book_isbn} = req.body;
    const client = await connectToDB();
    const rawData = await client.query("SELECT borrow_approved_by_staff FROM borrowed_books WHERE customer_email = $1 AND book_isbn = $2", [customer_email, book_isbn]);
    if (rawData.rows[0].borrow_approved_by_staff == "PENDING" || rawData.rows[0].borrow_approved_by_staff == "REJECTED"){res.write("no_borrow_approval"); res.end(); return;}
    await client.query("UPDATE borrowed_books SET borrow_completed = $1 WHERE customer_email = $2 AND book_isbn = $3", [markValue, customer_email, book_isbn]);

    if (markValue == "YES"){
      await increaseBookQuantity(book_isbn);
      await sendNotification(customer_email, "Book Returned Successfully!", `You have returned your borrowed book with the following ISBN: ${book_isbn}.`);
    }
    else if (markValue == "NO"){
      await decreaseBookQuantity(book_isbn);
      await sendNotification(customer_email, "Revision in book return!", `Staff has marked your book with the ISBN ${book_isbn} as "not returned", it was previously marked as returned.`);
    }
    
    res.write("success");
    res.end();
  }
  catch(error){
    console.log(`libraryController.js -> handleBorrowCompletion: ${error.message}`);
    res.write("failure");
    res.end();
    return;
  }
}

async function handleBorrowApproval(req, res){
  try{
    const { action, customer_email, book_isbn } = req.body;
    if (!action || !customer_email || !book_isbn){ res.write("missing_entries"); res.end(); return; }

    const client = await connectToDB();
    const rawData = await client.query("SELECT borrow_approved_by_staff FROM borrowed_books WHERE customer_email = $1 AND book_isbn = $2", [customer_email, book_isbn]);
    if (rawData.rows.length == 0){ res.write("no_borrow_found"); res.end(); return; }

    // If already accepted and trying to accept again
    if (rawData.rows[0].borrow_approved_by_staff == "ACCEPTED" && action == "ACCEPTED"){ res.write("already_approved"); res.end(); return; }

    if (action == "ACCEPTED"){
      // Check stock
      const stock = await client.query("SELECT quantity FROM library WHERE isbn = $1", [book_isbn]);
      if (stock.rows[0].quantity <= 0){ res.write("book_is_out_of_stock"); res.end(); return; }

      await client.query("UPDATE borrowed_books SET borrow_approved_by_staff = $1, borrow_date = CURRENT_DATE, deadline_date = CURRENT_DATE + INTERVAL '14 days' WHERE customer_email = $2 AND book_isbn = $3", [action, customer_email, book_isbn]);
      await client.query("UPDATE library SET quantity = quantity - 1 WHERE isbn = $1", [book_isbn]);

      await sendNotification(customer_email, "Book borrow has been accepted!", `Your borrow request for book with ISBN: ${book_isbn} has been ACCEPTED!`);

      res.write("success");
      res.end();
      return;
    }
    else if (action == "REJECTED"){
      await client.query("UPDATE borrowed_books SET borrow_approved_by_staff = $1 WHERE customer_email = $2 AND book_isbn = $3", [action, customer_email, book_isbn]);
      await sendNotification(customer_email, "Book borrow has been rejected!", `Your borrow request for book with ISBN: ${book_isbn} has been REJECTED!`);

      res.write("success");
      res.end();
      return;
    }
    else{
      res.write("invalid_action");
      res.end();
      return;
    }
  }
  catch(error){
    console.log(`libraryController.js -> handleBorrowApproval: ${error.message}`);
    res.write("failure");
    res.end();
  }
}

async function increaseBookQuantity(book_isbn){
  try{
    const library_db = await connectToDB();

    const rawData = await library_db.query("SELECT quantity FROM library where isbn = $1", [book_isbn]);
    const currentBookQuantity = rawData[0]["quantity"];

    const newBookQuantity = currentBookQuantity + 1;
    await library_db.query("UPDATE library SET quantity = $1 WHERE isbn = $2", [newBookQuantity, book_isbn]);
  }
  catch(error){
    console.log(`libraryController.js -> increaseBookQuantity: ${error.message}`);
  }
}

async function decreaseBookQuantity(book_isbn){
  try{
    const library_db = await connectToDB();

    const rawData = await library_db.query("SELECT quantity FROM library where isbn = $1", [book_isbn]);
    const currentBookQuantity = rawData[0]["quantity"];

    const newBookQuantity = currentBookQuantity - 1;
    await library_db.query("UPDATE library SET quantity = $1 WHERE isbn = $2", [newBookQuantity, book_isbn]);
  }
  catch(error){
    console.log(`libraryController.js -> increaseBookQuantity: ${error.message}`);
  }
}

module.exports = {
  addBook,
  editBooks,
  submitEditedBook,
  deleteBook,
  viewLibrary,
  viewBorrows,
  handleBorrowCompletion,
  handleBorrowApproval,
}