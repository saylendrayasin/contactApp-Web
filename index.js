const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const PORT = 3000;
const { loadContact, findContact, addContact } = require("./utils/contacts");

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded());

//Menampilkan halaman root
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

//Menampilkan halaman about
app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout.ejs",
    title: "Aboutpage",
  });
});

//Menampilkan halaman contact
app.get("/contact", (req, res) => {
  const contacts = loadContact();
  res.render("contact", {
    layout: "layouts/main-layout.ejs",
    title: "Contactpage",
    contact: contacts,
  });
});

//Menampilkan halaman untuk tambah contact
app.get("/contact/add", (req, res) => {
  res.render("addContacts", {
    title: "Addcontatpage",
    layout: "layouts/main-layout.ejs",
  });
});

//Proses data contact
app.post("/contact", (req, res) => {
  const object = req.body;
  object.Nama = object.firstName + " " + object.lastName;
  //Hapus properti firstName dan lastName
  delete object.firstName;
  delete object.lastName;

  addContact(object);
  res.redirect("/contact");
});

//Menampilkan halaman untuk melihat detail contact
app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("detail", {
    layout: "layouts/main-layout.ejs",
    title: "Detailcontactpage",
    contact: contact,
  });
});

// Menampilkan halaman untuk route yang tidak diketahui atau error
app.use("/", (req, res) => {
  res.status(404);
  res.send("404");
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT} in http://localhost:${PORT}`);
});
