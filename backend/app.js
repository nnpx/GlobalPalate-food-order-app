// import dotenv from "dotenv";
// import fs from "node:fs/promises";

// import bodyParser from "body-parser";
// import express from "express";

// dotenv.config();

// const app = express();

// app.use(bodyParser.json());
// app.use(express.static("public"));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// app.get("/meals", async (req, res) => {
//   const meals = await fs.readFile("./data/available-meals.json", "utf8");
//   res.json(JSON.parse(meals));
// });

// app.post("/orders", async (req, res) => {
//   const orderData = req.body.order;

//   if (
//     orderData === null ||
//     orderData.items === null ||
//     JSON.stringify(orderData.items) === JSON.stringify([])
//   ) {
//     return res.status(400).json({ message: "Missing data." });
//   }

//   if (
//     orderData.customer.email === null ||
//     !orderData.customer.email.includes("@") ||
//     orderData.customer.name === null ||
//     orderData.customer.name.trim() === "" ||
//     orderData.customer.street === null ||
//     orderData.customer.street.trim() === "" ||
//     orderData.customer["postal-code"] === null ||
//     orderData.customer["postal-code"].trim() === "" ||
//     orderData.customer.city === null ||
//     orderData.customer.city.trim() === ""
//   ) {
//     return res.status(400).json({
//       message:
//         "Missing data: Email, name, street, postal code or city is missing.",
//     });
//   }

//   const newOrder = {
//     ...orderData,
//     id: (Math.random() * 1000).toString(),
//   };
//   const orders = await fs.readFile("./data/orders.json", "utf8");
//   const allOrders = JSON.parse(orders);
//   allOrders.push(newOrder);
//   await fs.writeFile("./data/orders.json", JSON.stringify(allOrders));
//   res.status(201).json({ message: "Order created!" });
// });

// app.use((req, res) => {
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }

//   res.status(404).json({ message: "Not found" });
// });

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });

import dotenv from "dotenv";
import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/meals", async (req, res) => {
  const meals = await fs.readFile("./data/available-meals.json", "utf8");
  console.log(`app.js meals: ${meals}`);
  res.json(JSON.parse(meals));
});

app.post("/orders", async (req, res) => {
  const orderData = req.body.order;

  if (
    orderData === null ||
    orderData.items === null ||
    JSON.stringify(orderData.items) === JSON.stringify([])
  ) {
    return res.status(400).json({ message: "Missing data." });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes("@") ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === "" ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === "" ||
    orderData.customer["postal-code"] === null ||
    orderData.customer["postal-code"].trim() === "" ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ""
  ) {
    return res.status(400).json({
      message:
        "Missing data: Email, name, street, postal code or city is missing.",
    });
  }

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };
  const orders = await fs.readFile("./data/orders.json", "utf8");
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile("./data/orders.json", JSON.stringify(allOrders));
  res.status(201).json({ message: "Order created!" });
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

// const cors = require("cors");

// const allowedOrigins = ["https://worldbites-inky.netlify.app"];
// app.use(
//   cors({
//     origin: allowedOrigins,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
//   })
// );

// app.options("*", cors());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
