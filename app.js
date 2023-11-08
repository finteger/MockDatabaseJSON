const express = require("express");
const ejs = require("ejs");
const fs = require("fs");

const app = express();
const port = 3000;
<<<<<<< HEAD

const filePath = "./database.json";

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true})); //for parsing application/x-www-form-urlencoded

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home.ejs");
});
=======
>>>>>>> 47accfd1ff457d2c3f7a739088acdda6e1edb6ea

app.get("/users/:id", (req, res) =>{
    const data = JSON.parse(fs.readFileSync(filePath));
    const user = data.users.find((user) => user.id === parseInt(req.params.id));
    const userData = JSON.stringify(user);

<<<<<<< HEAD
   res.render('home.ejs', {userData});
=======

app.get("/", (req, res) => {
    res.send("Hello World!");
>>>>>>> 47accfd1ff457d2c3f7a739088acdda6e1edb6ea
});

app.listen(port, () => {
    console.log(`Connected on port ${port}`);
});



