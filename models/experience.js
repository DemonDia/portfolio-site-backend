const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
    company_name: {
        type: String,
        required: true,
    },
    starting: {
        type: String,
        required: true,
    },
    ending: {
        type: String,
        required: true,
    },
    details: {
        type: Array,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: false,
    },
});

const Experience = mongoose.model("Experience", experienceSchema);
module.exports = Experience;
