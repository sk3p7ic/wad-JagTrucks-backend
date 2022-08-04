const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const truckUserSchema = new Schema({
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

const studentUserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  phoneNumber: String,
  password: String,
});

const TruckUserModel = mongoose.model("TruckUsers", truckUserSchema);
const StudentUserModel = mongoose.model("studentUsers", studentUserSchema);

const addTruckUser = (
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
  TruckUserModel.create(
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
      if (err) {
        console.error(err);
        response.json({ success: false, reason: "SRV_ERR", user: null });
      }
      response.json({ success: true, reason: "", user: newUser });
    }
  );
  //Todo: enforce single email
};
function signIn(authName, password, response) {
  TruckUserModel.findOne({ email: authName }, (err, user) => {
    if (err || user === null) {
      console.error(err);
      response.json({ valid: false, user: null });
      return;
    }
    response.json({ valid: user.password === password, user: user });
  });
}
module.exports = { addTruckUser, signIn };
