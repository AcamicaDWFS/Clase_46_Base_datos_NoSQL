const mongoose = require('mongoose');
const express = require('express');
const app = express();
mongoose.connect('mongodb://localhost:27017/menu_rest', { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = mongoose;

const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/menu_rest', { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = mongoose;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Inicializaremos el Server en el puerto 3000
app.listen(3000, () => {
    console.log("El servidor está inicializando en el puerto 3000");
});

const menu = mongoose.model("platillos", {
    plato: String,
    precio: Number,
    tipo_de_plato: String
});

function verificacion_plat(req, res, next) {
    let plat = { _id: req.body.id };

    menu.findById(plat, function (err, platillo) {
        console.log(err);

        if (err == null) {
        next();
        } else {
            let respuesta = {
                error: true,
                codigo: 404,
                mensaje: "No se encontró dicho platillo"
            }
            res.status(404).send(respuesta);
        }
    });
}

app.use(verificacion_plat);

app.delete('/eliminar_platillo', function (req, res) {
    let plat = { _id: req.body.id };
    let respuesta = {
        error: false,
        codigo: 200,
        mensaje: "Se eliminó el platillo con éxito"
    }
    menu.findByIdAndDelete(plat, (err, res) => {
        console.log(err, "No se encontró el plato");
        respuesta = {
            error: true,
            codigo: 500,
            mensaje: "No se encontró el platillo"
        }

    });

    res.status(500).send(respuesta);
});