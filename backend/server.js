const express = require("express");
const { dirname } = require("path");
const path = require("path");
const pizzaRoutes = require("./routes/pizza");
const allergens  = require("./routes/allergens");

const port = 9002;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/pizza", pizzaRoutes);
app.use("/api/allergen", allergens);

app.get(["/", "/pizza/list"], (req, res) =>
    res.sendFile(path.resolve(__dirname + "/../frontend/index.html"))
);
app.use("/public",express.static(path.resolve(`${__dirname}/../frontend/public`)));

app.listen(port, (_) => console.log(`http://127.0.0.1:${port}/pizza/list`));