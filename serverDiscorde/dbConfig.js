const mongoose = require("mongoose")

const db = mongoose.connect(process.env.DB, {
    keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

module.exports = db;