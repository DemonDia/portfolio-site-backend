const express = require("express");
const mongoose = require("mongoose");
const Skill = require("./models/skill");
require("dotenv").config();

const app = express();

database_uri = process.env.DATABASE_URI;
app.use(express.json());

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

// =====================skills=====================
app.get("/skills", (req, res) => {
    Skill.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post("/skills", (req, res) => {
    // check if skill exist
    Skill.findOne({ name: req.body.name }).then((result) => {
        console.log("RESULT", result);
        if (!result) {
            const skill = new Skill({
                name: req.body.name,
                year_learnt: req.body.year_learnt,
            });
            skill
                .save()
                .then((result) => {
                    res.send({
                        success: true,
                        message: "Skill added!",
                        data:result
                    });
                })
                .catch((err) => res.send(err));
        }
        else{
            res.send({
                success: false,
                message: "Skill already exists!",
            });
        }
    });
});

app.listen(8000);
