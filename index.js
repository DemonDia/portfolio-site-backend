const express = require("express");
const cors = require('cors') 

const mongoose = require("mongoose");
const Skill = require("./models/skill");
const Project = require("./models/project");
const Experience = require("./models/experience");
require("dotenv").config();

const app = express();
app.use(cors())

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
app.get("/skills", async (req, res) => {
    await Skill.find()
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
app.get("/skills/:id", async (req, res) => {
    await Skill.findById(req.params.id).then((result) => {
        if (!result) {
            res.send({
                success: false,
                info:req.params,
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
app.post("/skills", async (req, res) => {
    // check if skill exist
    await Skill.findOne({ name: req.body.name }).then((result) => {
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

app.put("/skills", async (req, res) => {
    await Skill.findById(req.body.skill_Id).then((result) => {
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

app.delete("/skills/:skill_Id", async (req, res) => {
    await Skill.findById(req.params.skill_Id).then((result) => {
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

app.delete("/skills/deleteall", async (req, res) => {
    await Skill.deleteMany()
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
app.get("/projects", async (req, res) => {
    await Project.find()
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

app.get("/projects/:project_Id", async (req, res) => {
    await Project.findById(req.params.project_Id).then((result) => {
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

app.post("/projects", async (req, res) => {
    const project = new Project({
        name: req.body.name,
        year: req.body.year,
        desc: req.body.desc,
        image: req.body.image,
        tech_stack: req.body.tech_stack,
        links: req.body.links,
    });
    await project
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

app.put("/projects", async (req, res) => {
    await Project.findById(req.body.project_Id).then((result) => {
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
                    image: req.body.image,
                    tech_stack: req.body.tech_stack,
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

app.delete("/projects/:project_Id", async (req, res) => {
    await Project.findById(req.params.project_Id)
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

app.delete("/projects/deleteall", async (req, res) => {
    await Project.deleteMany()
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
app.get("/experiences", async (req, res) => {
    await Experience.find()
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

app.get("/experiences/:experience_Id", async (req, res) => {
    await Experience.findById(req.params.experience_Id).then((result) => {
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
app.post("/experiences", async (req, res) => {
    const experience = new Experience({
        companyName: req.body.companyName,
        start: req.body.start,
        end: req.body.end,
        desc: req.body.desc,
        roleName: req.body.roleName,
    });
    await experience
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
app.put("/experiences", async (req, res) => {
    await Experience.findById(req.body.experience_Id).then((result) => {
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

app.delete("/experiences/:experience_Id", async (req, res) => {
    await Experience.findById(req.params.experience_Id)
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

app.delete("/experiences/deleteall", async (req, res) => {
    await Experience.deleteMany()
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
