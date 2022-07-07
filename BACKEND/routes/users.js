const router = require("express").Router();
const { response } = require("express");
let User = require("../models/User");

//Add user
router.route("/add").post((req, res) => {
  let newUser = new User(req.body);

  newUser
    .save()
    .then(() => {
      res.json("User Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//display user
router.route("/display").get((req, res) => {
  //promise
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update user
router.route("/update/:id").put(async (req, res) => {
  //update by using async function
  let UserId = req.params.id;

  //using destructure
  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    mobile,
    status,
    password,
    accountType,
  } = req.body;

  const updateUser = {
    firstName,
    lastName,
    email,
    dateOfBirth,
    mobile,
    status,
    password,
    accountType,
  };
  //await function
  const update = await User.findByIdAndUpdate(UserId, updateUser)
    .then(() => {
      res.status(200).send({ status: "user updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

//delete user
router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;

  await User.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "User Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting data", error: err.message });
    });
});

//find(get)
router.route("/get/:id").get(async (req, res) => {
  let userRouter = req.params.id;
  const user = await User.findById(userId)
    .then((results) => {
      res.status(200).send({ results });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message });
    });
});

// Login Route
router.post("/login", function (req, res, next) {
  var email = req.body.email;
  var pw = req.body.password;
  User.findOne({ email: email }, function (err, profile) {
    if (err) return res.status(500).json(err);
    console.log(profile);
    if (profile && profile.password === pw) {
      const payload = {
        firstname: profile.firstName,
        lastname: profile.lastName,
        email: profile.email,
        id: profile._id,
        status: profile.status,
        accountType: profile.accountType,
        dateOfBirth: profile.dateOfBirth,
        mobile: profile.mobile,
      };

      res.status(200).json({ profile: payload });
    } else {
      res.status(400).json({ msg: "Wrong Email or Password" });
    }
  });
});

//search note by userId

module.exports = router;
