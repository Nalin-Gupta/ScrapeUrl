const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    address : {
        type : String
    },

    data : {
        type : Array

    },
});

const Url = mongoose.model('Url' , UrlSchema);

module.exports = Url;