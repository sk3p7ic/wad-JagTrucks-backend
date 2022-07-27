const mongoose = require("mongoose");

const mongodb = "mongodb://localhost/jag_trucks";
mongoose.connect(mongodb);

const dbConnection = mongoose.connection;

dbConnection.on("error", console.error.bind(console, "MongoDB had an error."));

const truckModel = require("./models/trucks");
const scheduleModel = require("./models/schedule");

const getAllTrucks = (response) => {
  truckModel.getAllTrucks(response);
};

const getTruckByProperty = (prop, value, response) => {
  switch (prop) {
    case "id":
      truckModel.getTruckById(value, response);
  }
};

const getEntireSchedule = (response) => {
  scheduleModel.getSchedule(response);
};

const getScheduleForMonth = (year, month, response) => {
  scheduleModel.getScheduleForMonth(parseInt(year), parseInt(month), response);
};

module.exports = {
  getAllTrucks,
  getTruckByProperty,
  getEntireSchedule,
  getScheduleForMonth,
};
