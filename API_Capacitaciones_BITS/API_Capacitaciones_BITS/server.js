/*Importar librería express
esta librería sirve para crear el servidor de solicitudes */
const express = require('express');

/* Importar librería cors (Cross-origin)
Esta librería sirve para recibir solicitudes del navegador 
cliente que pudiera tener un nombre de dominio diferente
*/
const cors = require('cors');

/* Esta librería sirve para atender las solicitudes
entrantes provenientes de un formulario através de req.body.property
*/

const bodyParser = require('body-parser');

/* Esta librería te permite utilizar las variables de ambiente definidas en el archivo .env
*/
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

const app = express();

//configurar cors

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));



//La siguiente configuración signifca que va a recibir sin credenciales y de cualquier origen:
/*
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/


//analizador application/json
app.use(bodyParser.json()); 

//analizador application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//set routes: esta parte integra las configuraciones definidas en routes/index.js
const router = require('./routes');
app.use('/api', router);

//set port: establece el puerto donde va a escuchar el servidor
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
