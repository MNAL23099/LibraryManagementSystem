const express = require("express");
const router = express.Router();
const {validateUserRole} = require("../controllers/sessionController.js");

// GET route with path parameter
router.post("/validateAccountRole", async(request, respose)=> {await validateUserRole(request, respose);});

module.exports = router;
