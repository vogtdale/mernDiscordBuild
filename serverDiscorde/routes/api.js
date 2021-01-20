"use strcit";

const mongoose = require("mongoose");
const mongoData = require("../models").Converstions;

module.exports = function (app) {
  app.route("/api/newchannel").post((req, res) => {
    const dbData = req.body;

    mongoData.create(dbData, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  });

  app.route("/api/allchannels").get((req, res) => {
    mongoData.find({}, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        let channels = [];

        data.map((channelData) => {
          const channelInfo = {
            id: channelData._id,
            channelName: channelData.channelName,
          };
          channels.push(channelInfo);
        });

        res.status(200).send(channels);
      }
    });
  });

  app.route("/api/delete/:id").delete(function (req, res) {
    let channelId = req.params.id;
    //if successful response will be 'delete successful'

    mongoData.findByIdAndDelete(channelId, (err, data) => {
      if (!err && data) {
        res.status(204).send("delete successful");
      } else if (!data) {
        return res.send("no channel with that Id exists");
      }
    });
  });

  app.route("/api/newmessage").post((req, res) => {
    mongoData.updateOne(
      { _id: req.query.id },
      { $push: { conversation: req.body } },
      
      (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      }
    );
  });

  app.route("/api/messages").get((req, res) => {
    mongoData.find({}, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  });

  app.route("/api/conversation").get((req, res) => {
      const id = req.query

      mongoData.find(id, (err, data) => {
          if (err) {
              res.status(500).send(err)
          }else {
              res.status(200).send(data)
          }
      })
  })

};
