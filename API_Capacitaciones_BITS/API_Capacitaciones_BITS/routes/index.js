const router = require('express').Router();
/* Se llama unicamenter al módulo de router express para configura las rutas
de solicitud del server de express*/

const usuarios = require('./usuarios');

router.use('/usuarios', usuarios);

/* Esta configuración define la ruta del request para el módulo 
de usuarios y en el archivo se especifica las acciones correspondientes */
router.get('/', (req,res) => {
    res.status(200).json({message:'Estas conectado a la API'});
});

module.exports = router;

