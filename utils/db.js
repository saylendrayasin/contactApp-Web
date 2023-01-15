const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/contact-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
