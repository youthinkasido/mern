const express = require("express")
const router = express.Router();


router.get("/test", (req,res) => res.json({msg: "This is the tweets route"}))// gives us a msg when visiting this path

module.exports = router;