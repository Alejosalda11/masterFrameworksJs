'use strict'

// cargar modulos para crear servidor
var express = require('express');
var bodyParser = require ('body-parser');


// ejecutar expresss (http)
var app = express();

//cargar ficheros rutas
var article_routes = require('./routes/article');

//caragr milddlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//cargar el cors

//añadir prefijos a rutas /cargar rutas
app.use('/api',article_routes);


// ruta po metodo de prueba
/*
app.get('/probando',(req, res) =>{
    
    return res.status(200).send({
        curso: 'master en frameworks js',
        autor: 'alejandro saldarriaga',
        web : 'alejosalda11.web'
    });
});
*/
//exportar modulo(fichero actual)
module.exports = app;