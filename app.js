const express = require("express");

const app = express();
const port = 8080;

//Middleware

function executeMiddleware(req, res, next){
    console.log("This is middleware!");
    next();
}

app.get("/", executeMiddleware, (req, res) => {
    console.log("Hello World!");
});


app.get('/products/:id', (req, res,) => {
    const productId = req.params.id;
    res.send(`Product with ID ${productId}`);
});



app.listen(port, () => {
    console.log(`Connected on port ${port}`);
})

