require("dotenv").config();
const express = require("express");
const db = require("./db/database");

const port = 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("Please use the api.");
});

app.get("/api/get/trucks", (req, res) => {
  db.getAllTrucks(res);
});

app.get("/api/get/trucks/:truckId", (req, res) => {
  db.getTruckByProperty("id", req.params.truckId, res);
});

app.get("/api/get/schedule", (req, res) => {
  db.getEntireSchedule(res);
});

app.get("/api/get/schedule/:year/:month", (req, res) => {
  db.getScheduleForMonth(req.params.year, req.params.month, res);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
