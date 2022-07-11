const router = require('express').Router();

const config = require ('../db/dbconfig');

const sql = require('mssql');

const upload = require('./upload');

/*consultar usuarios*/

router.get('/listar', (req, res) => {
     const query = 'SELECT * FROM usuarios ;';
     sql.connect(config, function(err){
        if (err)console.log(err);
        var request = new sql.Request();
        request.input('nombre',sql.VarChar, req.body.nombre);  
        request.multiple = true;
        request.query(query, function (err, result) {            
            if (err) console.log(err);
            else res.json(result.recordset);
        });
     });
});

/* Insertar usuarios */

router.post('/insertar', upload.array(), (req, res) => {
    const query = 'INSERT INTO usuarios VALUES (@nombre,@apellido,@correo,@contrasena,@edad,@credencial);';
    sql.connect(config, function(err){
       if (err)console.log(err);
       var request = new sql.Request();
       request.input('nombre',sql.VarChar, req.body.nombre);  
       request.input('apellido',sql.VarChar, req.body.apellido);  
       request.input('correo',sql.VarChar, req.body.correo);  
       request.input('contrasena',sql.VarChar, req.body.contrasena);  
       request.input('edad',sql.Date, req.body.edad);  
       request.input('credencial',sql.VarChar, req.body.credencial); 

       request.multiple = true;
       request.query(query, function (err, result) {            
           if (err) console.log(err);
           else res.send(200);
       });
    });
});

/* Login */

router.post('/login', (req, res) => {
    const query = 'SELECT nombre_usuario, apellidos_usuario, correo_usuario, contrasena_usuario, edad_usuario, credencial_usuario FROM usuarios WHERE nombre_usuario = @nombre AND contrasena_usuario = @contrasena;';
        sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.input('nombre',sql.VarChar,req.body.nombre);
        request.input('contrasena',sql.VarChar,req.body.contrasena);
        request.multiple = true;
        request.query(query, function (err, result) {          
            if (err) console.log(err);
            else
            {
              if(result.recordset.length > 0){
                const id = result.recordset.id;           
                res.json({
                  auth: true,
                });
              }
              else
              {
                res.json({auth: false, message: "AuthFailed"});
              }
            } 
        });
    });
  });

  router.delete ('/eliminar', (req, res) => {
    const query = 'DELETE FROM usuarios WHERE id_usuario = @id;';    
    sql.connect(config, function(err){
       if (err)console.log(err);
       var request = new sql.Request();
       request.input('id',sql.VarChar, req.body.id);  
       request.multiple = true;
       request.query(query, function (err, result) {            
           if (err) console.log(err);
           else res.send(200);
       });
    });
});

router.post('/insertar', upload.array(), (req, res) => {
  const query = 'INSERT INTO usuarios VALUES (@nombre,@apellido,@correo,@contrasena,@edad,@credencial);';
  sql.connect(config, function(err){
     if (err)console.log(err);
     var request = new sql.Request();
     request.input('nombre',sql.VarChar, req.body.nombre);  
     request.input('apellido',sql.VarChar, req.body.apellido);  
     request.input('correo',sql.VarChar, req.body.correo);  
     request.input('contrasena',sql.VarChar, req.body.contrasena);  
     request.input('edad',sql.Date, req.body.edad);  
     request.input('credencial',sql.VarChar, req.body.credencial); 

     request.multiple = true;
     request.query(query, function (err, result) {            
         if (err) console.log(err);
         else res.send(200);
     });
  });
});


module.exports = router;