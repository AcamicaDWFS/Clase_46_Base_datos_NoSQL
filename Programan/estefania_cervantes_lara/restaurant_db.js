const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/menu_rest', {useNewUrlParser: true, useUnifiedTopology: true});
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

let platillo_1 = {
    plato: "arroz",
    precio: 60,
    tipo_de_plato: "entrada"
};

let platillo_2 = {
    plato: "pollo asado",
    precio: 100,
    tipo_de_plato: "plato fuerte"
};

let platillo_3 = {
    plato: "sopa",
    precio: 50,
    tipo_de_plato: "entrada"
};

let platillo_4 = {
    plato: "flan napolitano",
    precio: 40,
    tipo_de_plato: "postre"
};


/* let insertPlatillo = new menu(platillo_1);
insertPlatillo.save();
insertPlatillo = new menu(platillo_2);
insertPlatillo.save();
insertPlatillo = new menu(platillo_3);
insertPlatillo.save();
insertPlatillo = new menu(platillo_4);
insertPlatillo.save(); */

//Creamos el metodo POST para crear un platillo
app.post('/nuevo_platillo', function (req, res) {
    let respuesta;
    console.log("REQUEST BODY.PLATO");
    console.log(req.body);
    if (req.body != undefined && req.body != "" && req.body != null) {
        let new_platillo= new menu(req.body);
        new_platillo.save();

        respuesta = {
            error: false,
            codigo: 200,
            mensaje: "El platillo se ha registrado"
        };
        res.send(respuesta);        
    } else {
        respuesta = {
            error: true,
            codigo: 400, 
            mensaje: "Se tienen que cubrir los campos solicitados"
        }
        res.status(400).send(respuesta);
    }       
  
});