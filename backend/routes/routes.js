const router = require("express").Router();

const fs = require("fs");
const path = require("path");
const dataRoute = path.join(__dirname + "/../pizza.json");

const readFile = fs.readFileSync(dataRoute);
const data = JSON.parse(readFile);
let pizza = data.pizza;

router.get("/", (req, res) => {
    res.send(data);
});

module.exports = router;