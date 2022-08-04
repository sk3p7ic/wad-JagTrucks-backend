const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_CONN_STRING);

const dbConnection = mongoose.connection;

dbConnection.on("error", console.error.bind(console, "MongoDB had an error."));

const truckModel = require("./models/trucks");
const scheduleModel = require("./models/schedule");
const userModel = require("./models/users");

const getAllTrucks = (response) => {
  truckModel.getAllTrucks(response);
};

const getTruckByProperty = (prop, value, response) => {
  switch (prop) {
    case "id":
      truckModel.getTruckById(value, response);
      break;
    case "foodType":
      truckModel.getTruckByFoodType(value, response);
      break;
    case "diningDollars":
      truckModel.getTruckByDiningDollars(value, response);
      break;
  }
};

const getEntireSchedule = (response) => {
  scheduleModel.getSchedule(response);
};

const getScheduleForMonth = (year, month, response) => {
  scheduleModel.getScheduleForMonth(parseInt(year), parseInt(month), response);
};

const getScheduleForDay = (year, month, day, response) => {
  scheduleModel.getScheduleForDay(
    parseInt(year),
    parseInt(month),
    parseInt(day),
    response
  );
};

const addUser = (
  userType,
  {
    firstName,
    lastName,
    username,
    email,
    phoneNumber,
    requestedPrimaryTruckName,
    password,
  },
  response
) => {
  switch (userType) {
    case "truck":
      userModel.addTruckUser(
        {
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
          phoneNumber: phoneNumber,
          requestedPrimaryTruckName: requestedPrimaryTruckName,
          password: password,
        },
        response
      );
      break;
    case "student":
      userModel.addStudentUser(
        {
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
        },
        response
      );
      break;
  }
};

function signIn(authName, password, userType, response) {
  switch (userType) {
    case "truck":
      userModel.signTruckIn(authName, password, response);
      break;
    case "student":
      userModel.signStudentIn(authName, password, response);
      break;
  }
}
module.exports = {
  getAllTrucks,
  getTruckByProperty,
  getEntireSchedule,
  getScheduleForMonth,
  getScheduleForDay,
  addUser,
  signIn,
};
