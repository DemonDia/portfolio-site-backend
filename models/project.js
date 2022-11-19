const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    imageLink: {
        type: String,
        required: true,
    },
    techStack: {
        type: Array,
        required: true,
    },
    links: {
        type: Array,
        required: true,
    },
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
