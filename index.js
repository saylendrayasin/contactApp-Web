const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const PORT = 3000;
const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
} = require("./utils/contacts");
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//Konfigurasi flash session
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 5000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

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
    msg: req.flash("msg"),
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
app.post(
  "/contact",
  [
    body("Nama").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("Nama yang anda masukkan sudah ada!");
      } else {
        return true;
      }
    }),
    check("NoHP", "Nomor HP tidak valid!").isMobilePhone("id-ID"),
    check("Email", "Email tidak valid!").isEmail(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      res.render("addContacts", {
        title: "Addcontactpage",
        layout: "layouts/main-layout.ejs",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      //Kirim flash message
      req.flash("msg", "Data contact berhasil ditambahkan!");
      res.redirect("/contact");
    }
  }
);

//Delete contact
app.get("/contact/delete/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  //cek kontak
  if (!contact) {
    res.status(404);
    res.send("<h1> 404 </h1>");
  } else {
    deleteContact(req.params.nama);
    //Kirim flash message
    req.flash("msg", "Data contact berhasil dihapus!");
    res.redirect("/contact");
  }
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
