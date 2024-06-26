const express = require("express");

const{
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/UserCtrl");

const userRouter = express.Router();

userRouter.route("/").post(createUser)
            .get(getUsers);

userRouter.route("/:id").get(getUserById)
            .put(updateUser)
            .delete(deleteUser);

module.exports = userRouter;