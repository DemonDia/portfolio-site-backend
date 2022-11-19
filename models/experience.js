const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
    companyName: {
        type: String,
        required: true,
    },
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    roleName: {
        type: String,
        required: true,
    },
});

const Experience = mongoose.model("Experience", experienceSchema);
module.exports = Experience;