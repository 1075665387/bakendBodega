//obtenemos el modelo 
var modeloMarcaVeh = require('../modelo/modeloMarcaVeh');
var express = require('express');
var router = express.Router();

//creamos el ruteo de la clase
module.exports = function ()
{

    //---------------------------------------------------------------
    //Muestra el método CRUL Listar  con get
    router.get("/", function (req, res)
    {
        modeloMarcaVeh.getListarMarcaVeh(function (error, data)
        {
            res.status(200).json(data);
        });
    });

    //---------------------------------------------------------------
    //Muestra el método CRUL filtrar con get
    router.get("/:id", function (req, res)
    {
        var id = req.params.id;

        //solo actualizamos si el id es un número
        if (!isNaN(id))
        {
            modeloMarcaVeh.getFiltrarMarcaVeh(id, function (error, data)
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
        else //si hay algún error
        {
            res.status(500).json({ "msg": "error" });
        }
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    router.post("/", function (req, res)
    {
        //creamos un objeto Json con los datos del tipo de documento
        var datosMarcaVeh =
            {
                id_marca_vehiculo: null,
                nombre_marca_vehiculo: req.body.nombre_marca_vehiculo,
            };


        //usamos la funcion para insertar
        modeloMarcaVeh.crearMarcaVeh(datosMarcaVeh, function (error, data)
        {
            //se muestra el mensaje correspondiente
            if (data)
            {
                res.status(200).json(data);
            }
            else
            {
                res.status(500).send({ error: "boo:(" });
            }
        });
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos para el método CRUL update (actualizar), usando el verbo put
    router.put("/", function (req, res)
    {
        //almacenamos los datos de la petición en un objeto

        var datosMarcaVeh =
            {
                id_marca_vehiculo: req.body.id_marca_vehiculo,
                nombre_marca_vehiculo: req.body.nombre_marca_vehiculo,
            };


        //usamos la funcion para actualizar
        modeloMarcaVeh.updateMarcaVeh(datosMarcaVeh, function (error, data)
        {
            //se muestra el mensaje correspondiente
            if (data && data.msg)
            {
                res.status(200).json(data);
            }
            else
            {
                res.status(500).send(
                { 
                    error: "boo:(" 
                });
            }
        });
    });


    //exportamos el objeto para tenerlo disponible en EL APP
    return router;
}
