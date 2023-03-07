const router = require("express").Router();

const fs = require("fs");
const path = require("path");
const dataRoute = path.join(__dirname + "/../allergens.json");

router.get("/", (req, res) => {
    //await pt readFile
    const readFile = fs.readFileSync(dataRoute);
    const data = JSON.parse(readFile);
    let allergens = data.allergens;
    res.send(allergens);
});

module.exports = router;