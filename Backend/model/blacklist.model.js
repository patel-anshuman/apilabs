const mongoose = require("mongoose")

const blacklistSchema = mongoose.Schema({
    token : {type: String}
});

const Blacklist = mongoose.model("blacklist",blacklistSchema)

module.exports = { Blacklist }