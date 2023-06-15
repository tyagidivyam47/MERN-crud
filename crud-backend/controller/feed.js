
const User = require('../models/post');

exports.getUsers = (req, res, next) => {
    User.find()
        .then((Users) => {
            if (!Users) {
                const error = new Error("No Users Found!!");
                throw error             // Error can be thrown inside then block 
            }                           // The thrown error inside will be treated as err in catch, so we can throw err inside then if catch 
            res.status(200).json({
                message: "Users Fetched Successfully",
                Users: Users
            })
        })

        .catch((err) => {
            if (!err, statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}

exports.createUser = (req, res, next) => {

    // const imageUrl = req.file.path || "https://images.unsplash.com/photo-1662010021854-e67c538ea7a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=352&q=80";
    const imageUrl = "https://images.unsplash.com/photo-1662010021854-e67c538ea7a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=352&q=80";
    console.log("aagya")
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;

    const user = new User({
        name: name,
        contact: contact,
        email: email,
        imageUrl: imageUrl,
    })

    user
        .save()
        .then((result) => {
            // console.log(result);
            res.status(201).json({
                message: 'User Created Successfully',
                User: result
            })
        })
        .catch(err => {
            if (!err, statusCode) {
                err.statusCode = 500;
            }
            next(err);              // throw err will not work here as it is a synchronous piece of code
        })
}

exports.getSingleUser = (req, res, next) => {
    const UserId = req.params.UserId;

    User.findById(UserId)
        .then((User) => {
            if (!User) {
                const error = new Error("Could not find any User");
                // The thrown error inside will be treated as err in catch, so we can throw err inside then if catch exist 
                throw error
            }
            res.status(200).json({ message: "Users Fetched", User: User })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.updateUsers = (req, res, next) => {
    const UserId = req.params.userId;
    const name = req.body.name;
    const contact = req.body.contact;
    const email = req.body.email;
    // let imageUrl = req.body.image;
    const imageUrl = "https://images.unsplash.com/photo-1662010021854-e67c538ea7a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=352&q=80";

    // console.log("id : ", UserId)

    // if (req.file) {
    //     imageUrl = req.file.path;
    // }
    if (!imageUrl) {
        throw new Error("No file picked");
    }

    User.findById(UserId)
        .then((User) => {
            if (!User) {
                const error = new Error("No Users Found!!");
                throw error             // Error can be thrown inside then block 
            }
            User.name = name;
            User.contact = contact;
            User.imageUrl = imageUrl;
            User.email = email;
            User.save();
        })
        .then((result) => {
            res.status(200).json({ message: "User Updated", User: result })
        })
        .catch((err) => {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.deleteUser = (req, res, next) => {
    const UserId = req.params.userId;
    console.log("user : ", UserId)
    // User.findById(UserId)
    //     .then((User) => {
    //         if (!User) {
    //             const error = new Error("No Users Found!!");
    //             throw error             // Error can be thrown inside then block 
    //         }
    //         // Check if the user is logged in
    //         return User.findByIdAndDelete(UserId);
    //     })
    User.findByIdAndDelete(UserId)
        .then((result) => {
            res.status(200).json({ message: "User Deleted" })
        })
        .catch((err) => {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}