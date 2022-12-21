const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const PORT = 3000;
const controllers = require("./src/controllers/controller");

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));

app.get("/", (req, res) => {
  // res.send("Hello");
  // res.sendFile("./src/pages/index.html", { root: __dirname });
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
    title: "Halaman Home",
    mahasiswa: mahasiswa,
    layout: "layouts/main-layout.ejs",
  });
});

app.get("/about", (req, res) => {
  // res.send("Hello, ini halaman about");
  // res.sendFile("./src/pages/about.html", { root: __dirname });
  res.render("about", {
    layout: "layouts/main-layout.ejs",
    title: "Halaman About",
  });
});

app.get("/contact", (req, res) => {
  // res.sendFile("./src/pages/contact.html", { root: __dirname });
  res.render("contact", {
    layout: "layouts/main-layout.ejs",
    title: "Halaman Contact",
  });
});

app.get("/products/:id", (req, res) => {
  res.send("Product ID : " + req.params.id);
});

app.get("/produk/:id", (req, res) => {
  //cth localhost:3000/produk/12?kategori=sepatu
  res.send(
    `ID Produk : ${req.params.id} <br/> Kategori : ${req.query.kategori}`
  );
});

app.get("/calculate/:a/:b", controllers.calculate);

app.use("/", (req, res) => {
  res.status(404);
  res.send("404");
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT} in http://localhost:${PORT}`);
});
