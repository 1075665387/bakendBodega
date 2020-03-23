//obtenemos el modelo 
var modeloDestino = require('../modelo/modelodestinos');
var express = require('express');
var router = express.Router();



//creamos el ruteo de la clase
module.exports = function ()
{

    //---------------------------------------------------------------
    //Muestra el método CRUL Listar  con get
    router.get("/", function (req, res)
    {
        modeloDestino.getListarDestino(function (error, data)
        {
            res.status(200).json(data);
        });
    });

    //---------------------------------------------------------------
    //Muestra el método CRUL filtrar con get
    router.get("/:destino", function (req, res)
    {
        var des = req.params.destino;

        //solo actualizamos si el id es un número
        if (!isNaN(des))//si se pudo convertir a entero
        {
            res.status(500).json({ "msg": "ingrese un destino valido" });
        }
        else 
        {
            modeloDestino.getFiltrarDestino(des, function (error, data)
            {
                //si el tipo de documento existe lo mostramos en formato json
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
        }
    });

    //exportamos el objeto para tenerlo disponible en EL APP
    return router;

}   