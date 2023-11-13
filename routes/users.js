const express = require("express");
const router = express.Router();
const fs = require("fs").promises;

const filePath = "./database.json"; //Link to our mock database

router.use(express.json());  // parse JSON
router.use(express.urlencoded({ extended: true})); //handle form data


async function readData(){
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

async function writeData(data){
     await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

router.get("/", async (req, res) => {

});



module.exports = router;
