const express = require("express");
const router = express.Router();
const fs = require("fs");

const filePath = "./database.json";

//define our routes

router.get("/", (req, res) => {
    res.render("home.ejs");
});

router.get("/users/:id", (req, res) =>{
    const data = JSON.parse(fs.readFileSync(filePath));
    const user = data.users.find((user) => user.id === parseInt(req.params.id));
    const userData = JSON.stringify(user);

   res.render('home.ejs', {userData});
});

module.exports = router;