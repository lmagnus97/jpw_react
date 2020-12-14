const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    usuario: {
        type: String,
        require: true
    },
    senha: {
        type: String,
        require: true
    },
    key: {
        type: String,
        require: true
    },
})

module.exports = schema