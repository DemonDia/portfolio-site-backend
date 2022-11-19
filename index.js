const express = require("express");
const mongoose = require("mongoose");
const Skill = require("./models/skill");
const Project = require("./models/project");
const Experience = require("./models/experience");
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
                .catch((err) =>
                    res.send({
                        success: false,
                        message: err,
                    })
                );
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

app.delete("/skills/deleteall", (req, res) => {
    Skill.deleteMany()
        .then((result) => {
            res.send({
                success: true,
                message: "Skills reset",
            });
        })
        .catch((err) => {
            res.send({
                success: false,
                message: err,
            });
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

app.get("/projects/id", (req, res) => {
    Project.findById(req.body.project_Id).then((result) => {
        if (!result) {
            res.send({
                success: false,
                message: "Project does not exist!",
            });
        } else {
            res.send({
                success: true,
                data: result,
            });
        }
    });
});

app.post("/projects", (req, res) => {
    const project = new Project({
        name: req.body.name,
        year: req.body.year,
        desc: req.body.desc,
        imageLink: req.body.imageLink,
        techStack: req.body.techStack,
        links: req.body.links,
    });
    project
        .save()
        .then((result) => {
            res.send({
                success: true,
                message: "Project added!",
                data: result,
            });
        })
        .catch((err) =>
            res.send({
                success: false,
                message: err,
            })
        );
});

app.put("/projects", (req, res) => {
    Project.findById(req.body.project_Id).then((result) => {
        if (!result) {
            res.send({
                success: false,
                message: "Project does not exist!",
            });
        } else {
            Project.updateOne(
                { _id: result._id },
                {
                    name: req.body.name,
                    year: req.body.year,
                    desc: req.body.desc,
                    imageLink: req.body.imageLink,
                    techStack: req.body.techStack,
                    links: req.body.links,
                }
            )
                .then((result) => {
                    res.send({
                        success: true,
                        message: "Project updated",
                    });
                })
                .catch((err) => {
                    res.send({
                        success: false,
                        message: err,
                    });
                });
        }
    });
});

app.delete("/projects", (req, res) => {
    Project.findById(req.body.project_Id)
        .then((result) => {
            if (!result) {
                res.send({
                    success: false,
                    message: "Project does not exist!",
                });
            } else {
                Project.deleteOne(result).then((result) => {
                    console.log(result);
                    // delete the skill
                    res.send({
                        success: true,
                        message: "Project deleted",
                    });
                });
            }
        })
        .catch((err) => {
            res.send({
                success: false,
                message: err,
            });
        });
});

app.delete("/projects/deleteall", (req, res) => {
    Project.deleteMany()
        .then((result) => {
            res.send({
                success: true,
                message: "Projects reset",
            });
        })
        .catch((err) => {
            res.send({
                success: false,
                message: err,
            });
        });
});
// ===============================experience===============================
app.get("/experiences", (req, res) => {
    Experience.find()
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

app.get("/experiences/id", (req, res) => {
    Experience.findById(req.body.experience_Id).then((result) => {
        if (!result) {
            res.send({
                success: false,
                message: "Experience does not exist!",
            });
        } else {
            res.send({
                success: true,
                data: result,
            });
        }
    });
});
app.post("/experiences", (req, res) => {
    const experience = new Experience({
        companyName: req.body.companyName,
        start: req.body.start,
        end: req.body.end,
        desc: req.body.desc,
        roleName: req.body.roleName,
    });
    experience
        .save()
        .then((result) => {
            res.send({
                success: true,
                message: "Experience added!",
                data: result,
            });
        })
        .catch((err) =>
            res.send({
                success: false,
                message: err,
            })
        );
});
app.put("/experiences", (req, res) => {
    Experience.findById(req.body.experience_Id).then((result) => {
        if (!result) {
            res.send({
                success: false,
                message: "Experience does not exist!",
            });
        } else {
            Experience.updateOne(
                { _id: result._id },
                {
                    companyName: req.body.companyName,
                    start: req.body.start,
                    end: req.body.end,
                    desc: req.body.desc,
                    roleName: req.body.roleName,
                }
            )
                .then((result) => {
                    res.send({
                        success: true,
                        message: "Experience updated",
                    });
                })
                .catch((err) => {
                    res.send({
                        success: false,
                        message: err,
                    });
                });
        }
    });
});

app.delete("/experiences", (req, res) => {
    Experience.findById(req.body.experience_Id)
        .then((result) => {
            if (!result) {
                res.send({
                    success: false,
                    message: "Experience does not exist!",
                });
            } else {
                Experience.deleteOne(result).then((result) => {
                    console.log(result);
                    // delete the skill
                    res.send({
                        success: true,
                        message: "Experience deleted",
                    });
                });
            }
        })
        .catch((err) => {
            res.send({
                success: false,
                message: err,
            });
        });
});

app.delete("/experiences/deleteall", (req, res) => {
    Experience.deleteMany()
        .then((result) => {
            res.send({
                success: true,
                message: "Experiences reset",
            });
        })
        .catch((err) => {
            res.send({
                success: false,
                message: err,
            });
        });
});
app.listen(3000);
