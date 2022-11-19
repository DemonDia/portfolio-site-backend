const express = require("express");
const mongoose = require("mongoose");
const Skill = require("./models/skill");
const Project = require("./models/project");
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

// ===============================skills===============================
app.get("/skills", (req, res) => {
    Skill.find()
        .then((result) => {
            res.send({
                success: true,
                data: result,
            });
        })
        .catch((err) => {
            console.log(err);
            res.send({
                success: false,
                message: err,
            });
        });
});
app.get("/skills/id", (req, res) => {
    Skill.findById(req.body.skill_Id).then((result) => {
        if (!result) {
            res.send({
                success: false,
                message: "Skill does not exist!",
            });
        } else {
            res.send({
                success: true,
                data: result,
            });
        }
    });
});
app.post("/skills", (req, res) => {
    // check if skill exist
    Skill.findOne({ name: req.body.name }).then((result) => {
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
                        data: result,
                    });
                })
                .catch((err) => res.send(err));
        } else {
            res.send({
                success: false,
                message: "Skill already exists!",
            });
        }
    });
});

app.put("/skills", (req, res) => {
    Skill.findById(req.body.skill_Id).then((result) => {
        if (!result) {
            res.send({
                success: false,
                message: "Skill does not exist!",
            });
        } else {
            Skill.updateOne(
                { _id: result._id },
                { name: req.body.name, year_learnt: req.body.year_learnt }
            ).then((result) => {
                res.send({
                    success: true,
                    message: "Skill updated",
                });
            });
        }
    });
});

app.delete("/skills", (req, res) => {
    Skill.findById(req.body.skill_Id).then((result) => {
        if (!result) {
            res.send({
                success: false,
                message: "Skill does not exist!",
            });
        } else {
            Skill.deleteOne(result).then((result) => {
                console.log(result);
                // delete the skill
                res.send({
                    success: true,
                    message: "Skill deleted",
                });
            });
        }
    });
});

// ===============================projects===============================
app.get("/projects", (req, res) => {
    Project.find()
        .then((result) => {
            res.send({
                success: true,
                data: result,
            });
        })
        .catch((err) => {
            console.log(err);
            res.send({
                success: false,
                message: err,
            });
        });
});

app.listen(3000);
