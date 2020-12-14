const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    apelido: String,
    posicao: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    id_time: {
        type: String,
        require: true
    },
})

module.exports = schema