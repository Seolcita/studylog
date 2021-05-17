const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email }, //first argument: find one based on email
    { name: email.split("@")[0], picture }, //second argument : once the email found, update name and picture
    { new: true } //third argument-optional: response with updated info
  );
  if (user) {
    // console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    console.log("USER CREATED", newUser);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  //from authCheck we got current user's email (req.user=firebaseUser)
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
