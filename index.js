const express = require("express");
const connectdb = require("./config/db");
const dotenv = require("dotenv").config();

const port = 5000;

connectdb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ajout des routes pour les fonction CRUD

app.use("/client", require("./Router/client.router"));

app.listen(port, () => {
  console.log(`Le server est démarré sur le port: ${port}`);
});
