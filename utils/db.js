const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/contact-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

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

//Menambah data contact
const ContactOne = new Contact({
  Nama: "Saylendra Yasin",
  NoHP: "081241924509",
  Email: "saylendra@gmail.com",
});

ContactOne.save()
  .then((contact) => {
    console.log(contact);
  })
  .catch((error) => {
    console.log(error);
  });
