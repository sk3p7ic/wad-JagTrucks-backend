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