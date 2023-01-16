const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb+srv://amarjeet:amarjeet@cluster0.hts1d30.mongodb.net/SocialMediaApp?retryWrites=true&w=majority")

module.exports = {connection}