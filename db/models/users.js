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

const addUser = (
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
  UserModel.findOne({ email: authName }, (err, user) => {
    if (err || user === undefined) {
      console.error(err);
      response.json({ valid: false, user: null });
    }
    response.json({ valid: user.password === password, user: user });
  });
}
module.exports = { addUser, signIn };
