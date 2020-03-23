//obtenemos el modelo 
var modeloConductor = require('../modelo/modeloConductor');
var express = require('express');
var router = express.Router();

//creamos el ruteo de la clase
module.exports = function ()
{

    //---------------------------------------------------------------
    //Muestra el método CRUL Listar  con get
    router.get("/", function (req, res)
    {
        modeloConductor.getListarConductor(function (error, data)
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
            modeloConductor.getFiltrarConductor(id, function (error, data)
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
            res.status(500).json({ "msg": "Ingrese un id valido" });
        }
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    router.post("/", function (req, res)
    {
        
        var tipo_documento=req.body.id_tipo_documento;
        if (!isNaN(tipo_documento))
        {    //creamos un objeto Json con los datos del tipo de documento
            var datosConductor =
            {   
                id_conductor: null,
                id_tipo_documento: req.body.id_tipo_documento,
                numero_documento: req.body.numero_documento,
                primer_nombre: req.body.primer_nombre,
                segundo_nombre: req.body.segundo_nombre,
                primer_apellido: req.body.primer_apellido,
                segundo_apellido: req.body.segundo_apellido,
                direccion: req.body.direccion,
                numero_telefono: req.body.numero_telefono,
                numero_licencia: req.body.numero_licencia,
                fecha_venci_licencia: req.body.fecha_venci_licencia,
                estado: req.body.estado,
            };


             //usamos la funcion para insertar
             modeloConductor.crearConductor(datosConductor, function (error, data)
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
        res.status(500).json({ "msg": "Ingrese un id valido" });
        }
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos para el método CRUL update (actualizar), usando el verbo put
    router.put("/", function (req, res)
    {   
        var conductor=req.body.id_conductor;
        var tipo_documento=req.body.id_tipo_documento;
        if (!isNaN(tipo_documento) && !isNaN(conductor))
        {

        //almacenamos los datos de la petición en un objeto

        var datosConductor =
            {
                id_conductor: req.body.id_conductor,
                id_tipo_documento: req.body.id_tipo_documento,
                numero_documento: req.body.numero_documento,
                primer_nombre: req.body.primer_nombre,
                segundo_nombre: req.body.segundo_nombre,
                primer_apellido: req.body.primer_apellido,
                segundo_apellido: req.body.segundo_apellido,
                direccion: req.body.direccion,
                numero_telefono: req.body.numero_telefono,
                numero_licencia: req.body.numero_licencia,
                fecha_venci_licencia: req.body.fecha_venci_licencia,
                estado: req.body.estado,
            };


        //usamos la funcion para actualizar
        modeloConductor.updateConductor(datosConductor, function (error, data)
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
        res.status(500).json({ "msg": "Ingrese un id valido" });
        }
    });


    //exportamos el objeto para tenerlo disponible en EL APP
    return router;
}
