const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Email", EmailSchema);
