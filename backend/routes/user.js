var express = require('express');
var router = express.Router();
const pool = require('../databases_connections/mysql_connection');

router.post('/signup', function(req, res) {
    console.log(req.body)
    const {name,email,password,rol}=req.body;
    try {// INSERCION DE NUEVO USUARIO EN LA BASE DE DATOS
        // verificando correo 
        pool.query("SELECT * FROM user WHERE email=? ;", [email], function(err,result){
            if (err) throw err;
            if (result.length == 0) {
               
                var sql = "INSERT INTO user (name,email,password,rol) VALUES(?,?,?,?);";
                pool.query(sql, [name,email,password,rol], function(err,result){
                    if (err) throw err;
                });
              console.log("Nuevo Usuario agregado a la BASE DE DATOS")
              res.status(201).json({msj: 'User Created',error: null});
            }else{
              res.status(409).json({msj: 'The email already exists in the database',error: true}); 
            }
          });
    } catch (er) {
        //console.log(error);
        res.status(500).json({msj: "error", error: er});
    }
});

router.put('/update', function(req, res) {
    console.log(req.body)
    const {id,name,email,password,rol}=req.body;
    try {// INSERCION DE NUEVO USUARIO EN LA BASE DE DATOS
        // verificando si existe el usuario con el id
        pool.query("SELECT * FROM user WHERE id=? ;", [id], function(err,result){
            if (err) throw err;
            if (result.length != 0) { 
                //actualizo el registro en db
                var sql = "UPDATE user SET name=?,email=?,password=?,rol=? WHERE id=? ;";
                pool.query(sql, [name,email,password,rol,id], function(err,result){
                    if (err) throw err;
                    if(result.length != 0){ 
                        
                    }
                });
                console.log("Usuario actualizado en la BASE DE DATOS")
                res.status(201).json({msj: 'User info updated',error: null});
            }else{
              res.status(409).json({msj: 'The user dont exists in the database', error: true}); 
            }
          });
    } catch (er) {
        //console.log(er);
        res.status(500).json({msj: 'error when update user info',error: er});
    }
});

router.delete('/remove', function(req, res) {
    const {id}=req.body;
    try {
        // verificando si existe el usuario con el id
        pool.query("SELECT * FROM user WHERE id=? ;", [id], function(err,result){
            if (err) throw err;
            if (result.length != 0) { 
                //actualizo el registro en db
                var sql = "DELETE FROM user WHERE id=? ;;";
                pool.query(sql, [id], function(err,result){
                    if (err) throw err;
                });
                res.status(201).json({msj: 'User removed',error: null});
            }else{
              res.status(409).json({msj: 'The user dont exists in the database', error: true}); 
            }
          });
    } catch (er) {
        //console.log(er);
        res.status(500).json({msj: 'error when update user info',error: er});
    }
});

router.patch('/password', function(req, res) {
    const {id,password}=req.body;
    try {
        // verificando si existe el usuario con el id
        pool.query("SELECT * FROM user WHERE id=? ;", [id], function(err,result){
            if (err) throw err;
            if (result.length != 0) { 
                //actualizo el registro en db
                var sql = "UPDATE user SET password=? WHERE id=? ;";
                pool.query(sql, [password,id], function(err,result){
                    if (err) throw err;
                    if(result.length != 0){ 
                        
                    }
                });
                console.log("Usuario actualizado en la BASE DE DATOS")
                res.status(201).json({msj: 'Password updated',error: null});
            }else{
              res.status(409).json({msj: 'The user dont exists in the database', error: true}); 
            }
          });
    } catch (er) {
        //console.log(er);
        res.status(500).json({msj: 'error when update user info',error: er});
    }
});

router.post('/login', function(req, res) {
    const {user,password}=req.body;
    const email = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    const isEmail = email.exec(user);
    let query="";
    if (!isEmail) {
      query = "SELECT * FROM user WHERE name=?;"
      console.log('El usuario quiere ingresar con nombre: ' + user);
    } else {
      query = "SELECT * FROM user WHERE email=?;"
      console.log('El usuario quiere ingresar con correo: ' + user);
    }
    try {
        // verificando correo 
        pool.query(query, [user], function(err,result){
            if (err) throw err;
            if (result.length > 0) {
                const data = result[0];
                const SavePassword = data.password;
                const RecivedPassword = password;
                //console.log(data)
                if (SavePassword==RecivedPassword) {
                    res.status(200).json({msj:data, error: null});
                } else {
                    res.status(401).json({msj:'Incorrect password', error: true}); 
                }
            }else{
                res.status(404).json({msj:'User not found in database', error: true}); 
            }
        });
    } catch (er) {
        //console.log(er);
        res.status(404).json({msj:'User not found in database', error:er});
    }
});

router.get('/admins', function(req, res) {
    try {
        pool.query("SELECT * FROM user WHERE rol=? ;", ['Admin'], function(err,result){
            if (err) throw err;
            if (result.length == 0) {
                res.status(403).json({msj: 'No admins on the database',error: true});
            }else{
                res.status(200).json({msj: result,error: null});
            }
          });
    } catch (er) {
        //console.log(error);
        res.status(500).json({msj: "error", error: er});
    }
});




module.exports = router;