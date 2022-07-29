require("dotenv").config();
const express = require("express");
const path = require("path");
const db = require("./db/database");

const port = 5000;

const app = express();

app.use(express.static(path.join(__dirname, "staticfiles")));

app.get("/", (req, res) => {
  res.send("Please use the api.");
});

app.get("/api/get/trucks", (req, res) => {
  db.getAllTrucks(res);
});

app.get("/api/get/trucks/:truckId", (req, res) => {
  db.getTruckByProperty("id", req.params.truckId, res);
});

app.get("/api/query/trucks/foodType/:type", (req, res) => {
  db.getTruckByProperty("foodType", req.params.type, res);
});

app.get("/api/query/trucks/diningDollars/:accepts", (req, res) => {
  db.getTruckByProperty(
    "diningDollars",
    req.params.accepts.toLocaleLowerCase() === "true",
    res
  );
});

app.get("/api/get/schedule", (req, res) => {
  db.getEntireSchedule(res);
});

app.get("/api/get/schedule/:year/:month", (req, res) => {
  db.getScheduleForMonth(req.params.year, req.params.month, res);
});

app.get("/api/get/schedule/:year/:month/:day", (req, res) => {
  db.getScheduleForDay(req.params.year, req.params.month, req.params.day, res);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
