const router = require("express").Router();
let savedData = {};
const fs = require("fs");
const path = require("path");
const dataRoute = path.join(__dirname + "/../orders.json");

router.get("/", (req, res) => {
  //await pt readFile
  const readFile = fs.readFileSync(dataRoute);
  const data = JSON.parse(readFile);
  let orders = data.orders;
  res.send(orders);
});

// router.post("/", req, res)=> {
//       const readFile = fs.readFileSync(dataRoute);
//   const data = JSON.parse(readFile);
//   savedData = Object.assign({ id: data.orders.length + 1 }, req.body);
//   savedData = req.body;
//   data.orders.push(savedData);
//   await fs.promises.writeFile(dataRoute, JSON.stringify(data, null, 2));
//   res.send(JSON.stringify(data));
// }
module.exports = router;
