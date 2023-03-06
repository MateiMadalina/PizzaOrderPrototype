const express = require("express");
const { dirname } = require("path");
const path = require("path");
const pizzaRoutes = require("./routes/routes");
const allergens = require("./allergens");

const port = 9002;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    "/public",
    express.static(path.resolve(`${__dirname}/../frontend/public`))
);

app.use("/api/pizza", pizzaRoutes);

app.get(["/", "/order/pizza"], (req, res) =>
    res.sendFile(path.resolve(__dirname + "/../frontend/index.html"))
);

app.get('/api/allergens', (req, res) => {
    fs.readFile(allergens, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.listen(port, (_) => console.log(`http://127.0.0.1:${port}/order/pizza`));