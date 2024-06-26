const User = require("../models/User");

//@desc create User
//@route POST /api/v1/user
//@access Public
exports.createUser = async (req, res) => {
  try {
    const { userId, firstName, lastName, email, mobile, role} = req.body;

    //Check already exists
    const userExists = await User.findOne({ userId });

    //if found
    if (userExists) {
      throw new Error("User already exists");
    }

    //Create User
    const newUser = await User.create({
        userId, firstName, lastName, email, mobile, role
    });

    res.status(201).json({
      status: "success",
      message: "New User created successfully",
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

//@desc Get all Users
//@route GET /api/v1/user
//@access Public
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(201).json({
      status: "success",
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

//@desc Get one User by id
//@route GET /api/v1/user/:id
//@access Public
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(201).json({
      status: "success",
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//@desc Update user
//@route PUT /api/v1/user/:id
//@access Public
exports.updateUser = async (req, res) => {
  try {
    const { userId, firstName, lastName, email, mobile, role} = req.body;

    //check already exists
    const userExist = await User.findOne({ userId });
    if (!userExist) {
      //throw new Error("User doesn't exist");
      res.status(404).json({message: "User doesn't exist"})
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        userId, firstName, lastName, email, mobile, role
      },
      {
        new: true,
      }
    );
    res.status(201).json({
      status: "success",
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//@desc Delete User
//@route DELETE /api/v1/user/:id
//@access Public
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
