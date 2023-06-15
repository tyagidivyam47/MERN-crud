const express = require('express');
// const { body } = require('express-validator')

const feedController = require("../controller/feed");

const route = express.Router();

route.get("/all", feedController.getUsers);

route.post(
    "/post",
    feedController.createUser
);

route.get("/user:userId", feedController.getSingleUser)

route.put(
    "/post/:userId",
    feedController.updateUsers
);

route.delete("/user/:userId", feedController.deleteUser)


module.exports = route;