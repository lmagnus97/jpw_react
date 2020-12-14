const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    categoria: {
        type: String,
        require: true
    },
    modo: {
        type: String,
        require: true
    },
})

module.exports = schema