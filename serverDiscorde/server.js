"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose')
const Pusher = require('pusher')
require("dotenv").config();
require("./dbConfig");


const apiRoutes = require("./routes/api.js");

const pusher = new Pusher({
  appId: "1141589",
  key: "45021814527a91c8a95f",
  secret: "1b868ed17082957c1ef5",
  cluster: "eu",
  useTLS: true
});

mongoose.connection.once('open', () => {
  console.log("Db connected")


  const changeStream = mongoose.connection.collection('converstions').watch()

  changeStream.on('change', (change) => {
    console.log("some change")
    if (change.operationType === 'insert') {
      console.log("new channel")
      pusher.trigger('channels', 'newChannel', {
        'change': change
      })
    }else if (change.operationType === 'update') {
      console.log('new message')
      pusher.trigger('conversation', 'newMessage', {
        'change': change
      })
    }else {
      console.log("Error triigering pusher")
    }
  })
})
//app config
const port = process.env.PORT || 3000;
const app = express();

//use middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routing for api
apiRoutes(app);

app.get("/", (req, res) => {
  res.status(200).send("hellow");
});

//404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404).type("text").send("Not Found");
});

// listener
const listener = app.listen(port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
