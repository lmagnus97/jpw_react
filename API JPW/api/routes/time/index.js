const express = require("express");
const mongoose = require("../../db/connect");
const router = express.Router();
var Schema = require("../../model/time");
var Model = mongoose.model("Time", Schema, "times");

router.get("/", function (req, res) {

    var filter = {}
    var limit = parseInt(req.query.limit | 10)

    if (req.query.categoria) {
        filter = {categoria: req.query.categoria}
    }

    Model.find(filter, function (err, doc) {
        if (!err) {
            res.status(200).json(doc);
        } else {
            res.status(500).json({ erro: "Erro ao acessar recurso" });
        }
    }).limit(limit);
});

router.get("/:id", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    Model.findOne({ "_id": req.params.id }, function (err, doc) {
        if (!err) {
            res.status(200).json(doc);
        } else {
            res.status(500).json({ erro: "Erro ao acessar recurso" });
        }
    });
});

router.post("/", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var data = new Model(req.body);
    data.save(function (err, doc) {
        if (!err) {
            res.status(200).json(doc);
        } else {
            res.status(500).json({ erro: "Erro ao acessar recurso" });
        }
    });
});

router.put("/:id/", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    if (Object.keys(req.body).length === 0) {
        res.status(400).json({ erro: "Nenhum dado enviado!" })
    }

    Model.findByIdAndUpdate(req.params.id, req.body, function (err, doc) {
        if (!err) {
            res.status(200).json(doc);
        } else {
            res.status(500).json({ erro: "Erro ao acessar recurso" });
        }
    });

});

router.delete("/:id", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*")
    Model.remove({ _id: req.params.id }, function (err, doc) {
        if (!err) {
            res.status(200).json(doc)
        }
        else {
            res.status(500).json({ erro: "Erro ao acessar recurso" });
        }
    });
});

module.exports = router;
