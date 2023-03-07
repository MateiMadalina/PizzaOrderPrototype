const express = require("express");
const { dirname } = require("path");
const path = require("path");
const pizzaRoutes = require("./routes/routes");
const { allergens } = require("./allergens.js");

const port = 9002;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/api/pizza", pizzaRoutes);

app.get(["/", "/order/pizza"], (req, res) =>
    res.sendFile(path.resolve(__dirname + "/../frontend/index.html"))
);
app.use("/public",express.static(path.resolve(`${__dirname}/../frontend/public`)));

app.get("/api/allergen", (req, res) => {
    res.send(allergens)
})

app.listen(port, (_) => console.log(`http://127.0.0.1:${port}/order/pizza`));