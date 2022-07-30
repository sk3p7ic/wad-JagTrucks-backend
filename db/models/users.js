const { query } = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  phoneNumber: String,
  password: String,
  accountStatus: String,
  requestedPrimaryTruckName: String,
  trucks: [Schema.Types.ObjectId],
});

const UserModel = mongoose.model("TruckUsers", userSchema);

const addUser = ({
  firstName,
  lastName,
  username,
  email,
  phoneNumber,
  requestedPrimaryTruckName,
  password,
}) => {
  UserModel.create(
    {
      _id: new mongoose.Types.ObjectId(),
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      accountStatus: "pending",
      requestedPrimaryTruckName: requestedPrimaryTruckName,
      trucks: [],
    },
    (err, newUser) => {
      if (err) console.error(err);
    }
  );
  //Todo: enforce single email
};
function signIn(authName, password, response) {
  UserModel.findOne({ email: authName }, (err, user) => {
    if (err || user === undefined) {
      console.error(err);
      response.json({ valid: false });
    }
    response.json({ vaild: user.password === password });
  });
}
module.exports = { addUser, signIn };
