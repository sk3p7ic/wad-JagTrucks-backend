const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const truckSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  profile_img_path: String,
  header_img_path: String,
  primary_food_type: {
    type: String,
    enum: ["Burgers", "Tex-Mex", "Mexican"],
  },
  accepts_dining_dollars: Boolean,
  socials: {
    type: Map,
    of: String,
  },
});

const TruckModel = mongoose.model("Trucks", truckSchema);

const addTruck = ({
  name,
  profile_img_path,
  header_img_path,
  primary_food_type,
  accepts_dining_dollars,
  socials,
}) => {
  TruckModel.create(
    {
      _id: new mongoose.Types.ObjectId(),
      name: name,
      profile_img_path: profile_img_path,
      header_img_path: header_img_path,
      primary_food_type: primary_food_type,
      accepts_dining_dollars: accepts_dining_dollars,
      socials: socials,
    },
    (err, newTruck) => {
      if (err) return handleError(err);
    }
  );
};

const getAllTrucks = (response) => {
  TruckModel.find({}, (err, dbTrucks) => {
    if (err) {
      console.log("Error retrieving trucks.");
      response.send("{undefined}");
    }
    var trucks = {};
    dbTrucks.forEach((truck) => {
      trucks[truck._id] = truck;
    });
    response.send(trucks);
  });
};
const getTruckById = (id, response) => {
  TruckModel.find({ _id: id }, (err, truck) => {
    if (err) {
      console.log(`Error retrieving truck with ID: ${id}`);
      response.send("{undefined}");
    }
    response.send(truck[0]);
  });
};
const getTruckByFoodType = (foodType, response) => {
  TruckModel.find({ primary_food_type: foodType }, (err, trucks) => {
    if (err) {
      console.log(`Error retrieving trucks with food type: ${foodType}`);
      response.send("{undefined}");
    }
    response.send(trucks);
  });
};
const getTruckByDiningDollars = (accepts, response) => {
  TruckModel.find({ accepts_dining_dollars: accepts }, (err, trucks) => {
    if (err) {
      console.log(
        `Error retrieving trucks ${
          accepts ? "" : "not "
        } accepting dining dollars`
      );
      response.send("{undefined}");
    }
    response.send(trucks);
  });
};

module.exports = {
  addTruck,
  getAllTrucks,
  getTruckById,
  getTruckByFoodType,
  getTruckByDiningDollars,
};
