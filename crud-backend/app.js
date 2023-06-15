const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');
const multer = require('multer')

const usersRoutes = require("./routes/users")

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}

// app.use(bodyParser.urlencoded)  This is used when getting response using form
app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})
app.use("/users", usersRoutes);


// The below code will work only when an error is thrown or passed with next
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({ message: message, data: data });
})

mongoose.connect("mongodb+srv://divyamtyagi:2104@cluster0.cqshg4z.mongodb.net/vle?retryWrites=true&w=majority")
    .then(result => {
        app.listen(8080);
    })
    .catch(err => {
        console.log(err);
    })
