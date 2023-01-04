//import package
const fs = require("fs");
const path = require("path");

//Cek dan create folder data
const pathDir = "./data";
if (!fs.existsSync(pathDir)) {
  fs.mkdirSync(pathDir);
}

//Cek dan create file contacts.js
const pathContacts = "./data/contacts.json";
if (!fs.existsSync(pathContacts)) {
  fs.writeFileSync(pathContacts, "[]", "utf-8");
}

//load contact
const loadContact = () => {
  const file = fs.readFileSync("./data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

//cari contact berdasarkan nama
const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (contact) => contact.Nama.toLowerCase() === nama.toLowerCase()
  );
  return contact;
};

//menuliskan atau menimpah file contacts.json dengan data yang baru
const saveContact = (contacts) => {
  fs.writeFileSync(pathContacts, JSON.stringify(contacts));
};

//menambahkan contact baru
const addContact = (contact) => {
  const newContacts = loadContact();
  newContacts.push(contact);
  saveContact(newContacts);
};

module.exports = { loadContact, findContact, addContact };
