const mongoose = require("mongoose");
//Schema
const Contact = mongoose.model("Contact", {
  Nama: {
    type: String,
    required: true,
  },
  NoHP: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
  },
});

module.exports = Contact;
