const mongoose = require("mongoose");

const mongodb = "mongodb://localhost/jag_trucks";
mongoose.connect(mongodb);

const dbConnection = mongoose.connection;

dbConnection.on("error", console.error.bind(console, "MongoDB had an error."));

const truckModel = require("./models/trucks");
