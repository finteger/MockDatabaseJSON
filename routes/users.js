const express = require("express");
const router = express.Router();
const fs = require("fs").promises;

const filePath = "./database.json";

router.use(express.json());
router.use(express.urlencoded({ extended: true }));



async function readData() {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
}

async function writeData(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    // The third parameter '2' is the number of spaces for indentation.
}


router.use(async (req, res, next) => {
    try {
        const data = await readData();
        res.locals.userData = JSON.stringify(data);
        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        console.error(error);
        res.render("error", { error });
    }
});


router.get("/", async (req, res) => {
    const data = res.locals.userData;
//res.locals is an object that provides a way to expose variables to the views.
    res.render("home.ejs", {data});
});

router.get("/api/users", async (req, res) => {
    const data = await readData();
    const userData = JSON.stringify(data, null, 2);
    res.send(userData);
});

router.get("/users/:id", async (req, res) => {
    const data = await readData();
    const user = data.users.find((user) => user.id === parseInt(req.params.id));
    const userData = JSON.stringify(user, null, 2);

    res.render("home.ejs", { userData });
});

router.post("/users", async (req, res) => {
    console.log(req.body);

    const data = await readData();
    const lastUser = data.users[data.users.length - 1];
    const nextId = lastUser ? lastUser.id + 1 : 1;

    const newUser = {
        id: nextId,
        username: req.body.username,
        first_name: req.body.first_name,
        email: req.body.email,
    };

    data.users.push(newUser);
    await writeData(data);

    res.send("User added successfully");
});

router.post('/users/:id/update', async (req, res) => {
    try {
        const data = await readData();
        const user = data.users.find((u) => u.id === parseInt(req.params.id));

        if (user) {
            user.username = req.body.new_username || user.username;
            user.first_name = req.body.new_first_name || user.first_name;
            user.email = req.body.new_email || user.email;

            await writeData(data);

            res.status(200).send('User successfully updated. Updated database: ' + JSON.stringify(data.users));
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/users/:id/delete', async (req, res) => {
    try {
        const data = await readData();
        const index = data.users.findIndex((u) => u.id === parseInt(req.params.id));

        if (index !== -1) {
            data.users.splice(index, 1);
            await writeData(data);

            res.status(200).send('User successfully deleted. Updated database: ' + JSON.stringify(data.users));
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
