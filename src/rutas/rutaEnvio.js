//obtenemos el modelo 
var modeloEnvio = require('../modelo/modeloEnvio');
var express = require('express');
var router = express.Router();



//creamos el ruteo de la clase
module.exports = function ()
{

    //---------------------------------------------------------------
    //Muestra el método CRUL Listar  con get
    router.get("/", function (req, res)
    {
        modeloEnvio.getListarEnvio(function (error, data)
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
            modeloEnvio.getFiltrarEnvio(id, function (error, data)
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
            res.status(500).json({ "msg": "ingrese un id valido" });
        }
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    router.post("/", function (req, res)
    {   
        var mercancia=req.body.id_mercancia;
        var vehiculo =req.body.id_vehiculo;
        if (!isNaN(mercancia) && !isNaN(vehiculo))
        {
        //creamos un objeto Json con los datos del tipo de documento
        var datosEnvio =
            {
                id_envio: null,
                fecha_envio: req.body.fecha_envio,
                destino: req.body.destino,
                peso: req.body.peso,
                id_mercancia: req.body.id_mercancia,
                id_vehiculo: req.body.id_vehiculo,
                cantidad: req.body.cantidad,
                
            };


        //usamos la funcion para insertar
        modeloEnvio.crearEnvio(datosEnvio, function (error, data)
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
        }
        else //si hay algún error
        {
        res.status(500).json({ "msg": "ingrese un id valido" });
        }
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos para el método CRUL update (actualizar), usando el verbo put
    router.put("/", function (req, res)
    {
        var envio=req.body.id_envio;
        var mercancia=req.body.id_mercancia;
        var vehiculo =req.body.id_vehiculo;
        if (!isNaN(mercancia) && !isNaN(vehiculo) && !isNaN(envio))
        {
        //almacenamos los datos de la petición en un objeto
         var datosEnvio =
            {
                id_envio: req.body.id_envio,
                fecha_envio: req.body.fecha_envio,
                destino: req.body.destino,
                peso: req.body.peso,
                id_mercancia: req.body.id_mercancia,
                id_vehiculo: req.body.id_vehiculo,
                cantidad: req.body.cantidad,
                
            };



        //usamos la funcion para actualizar
        modeloEnvio.updateEnvio(datosEnvio, function (error, data)
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
        }
        else //si hay algún error
        {
        res.status(500).json({ "msg": "ingrese un id valido" });
        }
    });


    //exportamos el objeto para tenerlo disponible en EL APP
    return router;
}
