const express = require("express");
const router = express.Router();

const {
  addBook,
  editBooks,
  submitEditedBook,
  deleteBook,
  viewLibrary,
  viewBorrows,
  handleBorrowCompletion,
  handleBorrowApproval
} = require("../controllers/libraryController.js");

const {
  viewBookCatalog,
  borrowBook,
  viewBorrowedBooks,
} = require("../controllers/customerController.js");

// ADD
router.post("/addBook", async(req, res)=>{
  console.log ("connection has been made to route!");
  await addBook(req, res);
});

// EDIT
router.get("/editBooks", editBooks);
router.post("/submitEditedBook", submitEditedBook);
router.post("/deleteBook", deleteBook);

// VIEW
router.get("/viewLibrary", viewLibrary);

// Routes for customer //
//View book catalog
router.get("/viewBookCatalog", async(req, res)=>{ 
  await viewBookCatalog(req, res);

});

//Borrow book
router.post("/borrowBook", async(req, res)=>{
  await borrowBook(req, res);
});

//View Borrowed books for Customer
router.post("/viewBorrowedBooks", async(req, res)=> {
  await viewBorrowedBooks(req, res);
});

//Routes For Staff //
//View Borrows for Staff
router.get("/viewBorrows", async(req, res)=>{
  await viewBorrows(req, res);
});

router.post("/handleBorrowCompletion", async(req, res)=>{
  console.log("route!!");
  await handleBorrowCompletion(req, res);
});

router.post("/handleBorrowApproval", async(req, res)=>{
  console.log("handleBorrowApproval route");
  await handleBorrowApproval(req, res);
});

module.exports = router;
