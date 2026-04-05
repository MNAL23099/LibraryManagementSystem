const express = require("express");
const router = express.Router();
const {addAccount, getAccounts, terminateAccount, restoreAccount} = require("../controllers/accountsController.js");

router.post("/addAccount", async(request, response)=> {
    await addAccount(request, response);
});

router.get("/fetchAccounts", async(request, response)=> {
    console.log("Route is working!");
    await getAccounts(request, response);
});

router.post("/terminateAccount", async(request, response)=> {
    await terminateAccount(request, response);
});

router.post("/restoreAccount", async(request, response)=> {
    await restoreAccount(request, response);
});

module.exports = router;