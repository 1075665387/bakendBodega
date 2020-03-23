//obtenemos el modelo 
var modeloVehiculo = require('../modelo/modeloVehiculo');
var express = require('express');
var router = express.Router();



//creamos el ruteo de la clase
module.exports = function ()
{

    //---------------------------------------------------------------
    //Muestra el método CRUL Listar  con get
    router.get("/", function (req, res)
    {
        modeloVehiculo.getListarVehiculo(function (error, data)
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
            modeloVehiculo.getFiltrarVehiculo(id, function (error, data)
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
            res.status(500).json({ "msg": "Digite un id Válido" });
        }
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    router.post("/", function (req, res)
    {   
        // variables para verificar que sean enteros los id digitados
        var tipo_vehiculo=req.body.id_tipo_vehiculo;
        var marca_vehiculo=req.body.id_marca_vehiculo;
        var color=req.body.id_color;
        var conductor=req.body.id_conductor;
        if (!isNaN(tipo_vehiculo) && !isNaN(marca_vehiculo)
        && !isNaN(color) && !isNaN(conductor))
        { 
           //creamos un objeto Json con los datos del tipo de documento
           var datosVehiculo =
            {
                id_vehiculo: null,
                id_tipo_vehiculo: req.body.id_tipo_vehiculo,
                id_marca_vehiculo: req.body.id_marca_vehiculo,
                id_color: req.body.id_color,
                modelo_vehiculo: req.body.modelo_vehiculo,
                placa_vehiculo: req.body.placa_vehiculo,
                capacidad_en_Tn: req.body.capacidad_en_Tn,
                id_conductor: req.body.id_conductor,
                estado: req.body.estado,
            };


          //usamos la funcion para insertar
          modeloVehiculo.crearVehiculo(datosVehiculo, function (error, data)
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

        }else //si hay algún error
         {
           res.status(500).json({ "msg": "inserte un id valido" });
         }
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos para el método CRUL update (actualizar), usando el verbo put
    router.put("/", function (req, res)
    {
        
        // variables para verificar que sean enteros los id digitados
        var vehiculo=req.body.id_vehiculo;
        var tipo_vehiculo=req.body.id_tipo_vehiculo;
        var marca_vehiculo=req.body.id_marca_vehiculo;
        var color=req.body.id_color;
        var conductor=req.body.id_conductor;
        //solo actualizamos si el id es un número
        if (!isNaN(vehiculo) && !isNaN(tipo_vehiculo) && !isNaN(marca_vehiculo)
        && !isNaN(color) && !isNaN(conductor))
        { 
        //almacenamos los datos de la petición en un objeto

           var datosVehiculo =
           {
            id_vehiculo: req.body.id_vehiculo,
            id_tipo_vehiculo: req.body.id_tipo_vehiculo,
            id_marca_vehiculo: req.body.id_marca_vehiculo,
            id_color: req.body.id_color,
            modelo_vehiculo: req.body.modelo_vehiculo,
            placa_vehiculo: req.body.placa_vehiculo,
            capacidad_en_Tn: req.body.capacidad_en_Tn,
            id_conductor: req.body.id_conductor,
            estado: req.body.estado,
           };
            //usamos la funcion para actualizar
            modeloVehiculo.updateVehiculo(datosVehiculo, function (error, data)
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
           res.status(500).json({ "msg": "inserte un id valido" });
         }
    });


    //exportamos el objeto para tenerlo disponible en EL APP
    return router;
}
