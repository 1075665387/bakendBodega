//obtenemos el modelo 
var modeloInformeMer = require('../modelo/modeloinformemercancia');
var express = require('express');
var router = express.Router();



//creamos el ruteo de la clase
module.exports = function ()
{


    //---------------------------------------------------------------
    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    router.get("/:nombre/:fecha1/:fecha2", function (req, res)
    {   
        
        var nom = req.params.nombre;
        var f1 = req.params.fecha1;
        var f2 = req.params.fecha2;
        //creamos un objeto Json con los datos del tipo de documento
        var datosFiltro =
            {
                nombre_mercancia: req.body.nombre_mercancia,
                fecha_envio1: req.body.fecha_envio1,
                fecha_envio2: req.body.fecha_envio2,
                
            };


        //usamos la funcion para insertar
        modeloInformeMer.getInformeMer(nom,f1,f2, function (error, data)
        {
            //si el informe existe lo mostramos en formato json
            if (typeof data !== 'undefined' && data.length > 0)
            {
                res.status(200).json(data);
            }
            //en otro caso mostramos una respuesta conforme no existe
            else
            {
                res.json(404, 
                { 
                    "msg": "Registro no Existe" 
                });
            }
        });
        
       
    });


    //exportamos el objeto para tenerlo disponible en EL APP
    return router;
}
