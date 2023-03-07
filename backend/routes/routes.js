const router = require("express").Router();

const fs = require("fs");
const path = require("path");
const dataRoute = path.join(__dirname + "/../pizza.json");

const readFile = fs.readFileSync(dataRoute);
const data = JSON.parse(readFile);
let pizza = data.pizza;

// const dataAllergens = path.join(__dirname + "/../allergens.js");

// const readAllergens = fs.readFile(dataAllergens);
// const dataAllergensParse = JSON.parse(readAllergens);
// let allergens = dataAllergensParse;

router.get("/", (req, res) => {
    res.send(data);
});

module.exports = router;