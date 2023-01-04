const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const PORT = 3000;
const { loadContact, findContact } = require("./utils/contacts");

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));

app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Saylendra",
      email: "saylendra@gmail.com",
    },
    {
      nama: "Edwin",
      email: "edwin@gmail.com",
    },
    {
      nama: "Mg",
      email: "mg@gmail.com",
    },
  ];
  res.render("index", {
    nama: "Saylendra Yasin",
    title: "Homepage",
    mahasiswa: mahasiswa,
    layout: "layouts/main-layout.ejs",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout.ejs",
    title: "Aboutpage",
  });
});

app.get("/contact", (req, res) => {
  const contacts = loadContact();
  res.render("contact", {
    layout: "layouts/main-layout.ejs",
    title: "Contactpage",
    contact: contacts,
  });
});

app.get("/contact/add", (req, res) => {
  res.render("addContact", {
    title: "Addcontatpage",
    layout: "layouts/main-layout.ejs",
  });
});

app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("detail", {
    layout: "layouts/main-layout.ejs",
    title: "Detailcontactpage",
    contact: contact,
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("404");
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT} in http://localhost:${PORT}`);
});
