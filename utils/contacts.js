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

//cek nama yang duplikat
const cekDuplikat = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.Nama === nama);
  return contact;
};

//hapus contact
const deleteContact = (nama) => {
  const contacts = loadContact();
  const filteredContact = contacts.filter((contact) => contact.Nama !== nama);
  saveContact(filteredContact);
};

//edit contact
const updateContacts = (newContacts) => {
  const contacts = loadContact();
  //Hilangkan kontak lama yang sama dengan nama lama
  const filteredContact = contacts.filter(
    (contact) => contact.Nama !== newContacts.NamaOld
  );
  delete newContacts.NamaOld;
  filteredContact.push(newContacts);
  saveContact(filteredContact);
};

module.exports = {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContacts,
};
