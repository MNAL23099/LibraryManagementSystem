const express = require("express");
const router = express.Router();
const {signUpUser, signInUser} = require("../controllers/authController");

// Route for signing up
router.post("/signup", async(req, res)=>{
  await signUpUser(req, res);
});

router.post("/signin", async(req,res)=>{
  await signInUser(req,res);
});

module.exports = router;
