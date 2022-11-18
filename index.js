const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

database_uri = process.env.DATABASE_URI;

// ==================connect to mongoose==================

async function connect() {
    try {
        await mongoose.connect(database_uri);
        console.log("Connected");
    } catch (error) {
        console.log(error);
    }
}

connect();
app.get("/", (req, res) => {
    res.json("OK");
});

app.listen(8000);
