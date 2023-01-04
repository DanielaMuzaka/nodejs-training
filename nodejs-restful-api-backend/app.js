const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const app = express();

// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + '-' + file.originalname);
//   }
// });

const { v4: uuidv4 } = require('uuid');
 
const fileStorage = multer.diskStorage({ //control where the file(images) get stored
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) { //defines how the file should be named
        cb(null, uuidv4())
    }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => { //general error handler
  console.log(error);
  const status = error.statusCode || 500; // in case stausCode is undefined it will tale value 500 by default
  const message = error.message; // message property exists by default and it holds the message
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    'mongodb+srv://daniela:EidU7TBHtDLtCS8C@cluster0.mnwzswz.mongodb.net/messages?retryWrites=true&w=majority'
  )
  .then(result => {
    //console.log(result);
    app.listen(8080);
  })
  .catch(err => console.log(err));
