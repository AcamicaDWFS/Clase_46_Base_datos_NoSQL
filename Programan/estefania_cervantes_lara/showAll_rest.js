const mongoose = require('mongoose');
const express = require('express');
const app = express();
mongoose.connect('mongodb://localhost:27017/menu_rest', { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = mongoose;

//Inicializaremos el Server en el puerto 3000
app.listen(3000, () => {
    console.log("El servidor está inicializando en el puerto 3000");
});

//Creamos un metodo GET raiz como punto de inicio
app.get('/', function (req, res) {
    //Creamos la respuesta
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: "Punto de inicio",

    };
    res.send(respuesta);
});

//Visualizar todos los platillos del menú
app.get('/menu_completo', function (req, res) {
    const menu = mongoose.model("platillos", {
        plato: String,
        precio: Number,
        tipo_de_plato: String
    });

    menu.find().then(function (resultado) {
        console.log(resultado);
        // Imprimimos respuesta
        res.send(resultado);
    });


});

