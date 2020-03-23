//obtenemos el modelo 
var modeloMercancia = require('../modelo/modeloMercancia');
var express = require('express');
var router = express.Router();

//creamos el ruteo de la clase
module.exports = function ()
{

    //---------------------------------------------------------------
    //Muestra el método CRUL Listar  con get
    router.get("/", function (req, res)
    {
        modeloMercancia.getListarMercancia(function (error, data)
        {
            res.status(200).json(data);
        });
    });

     //Muestra el método CRUL Listar marcas mercancias
     router.get("/marcas", function (req, res)
     {
         modeloMercancia.getListarMarcas(function (error, data)
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
            modeloMercancia.getFiltrarMercancia(id, function (error, data)
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
        var marca_mercancia=req.body.id_marca_mercancia;
        if (!isNaN(marca_mercancia))
        {
        //creamos un objeto Json con los datos del tipo de documento
        var datosMercancia =
            {
                id_mercancia: null,
                id_marca_mercancia: req.body.id_marca_mercancia,
                codigo_mercancia: req.body.codigo_mercancia,
                nombre_mercancia: req.body.nombre_mercancia,
                precio_compra_mercancia: req.body.precio_compra_mercancia,
                precio_venta_mercancia: req.body.precio_venta_mercancia,
                peso: req.body.peso,
                estado: req.body.estado,
            };


            //usamos la funcion para insertar
            modeloMercancia.crearMercancia(datosMercancia, function (error, data)
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
            res.status(500).json({ "msg": "Ingrese un id valido" });
        }
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos para el método CRUL update (actualizar), usando el verbo put
    router.put("/", function (req, res)
    {
        var marca_mercancia=req.body.id_marca_mercancia;
        var id_mercancia=req.body.id_mercancia;
        if (!isNaN(marca_mercancia) && !isNaN(id_mercancia))
        {
        //almacenamos los datos de la petición en un objeto

        var datosMercancia =
            {
                id_mercancia: req.body.id_mercancia,
                id_marca_mercancia: req.body.id_marca_mercancia,
                codigo_mercancia: req.body.codigo_mercancia,
                nombre_mercancia: req.body.nombre_mercancia,
                precio_compra_mercancia: req.body.precio_compra_mercancia,
                precio_venta_mercancia: req.body.precio_venta_mercancia,
                peso: req.body.peso,
                estado: req.body.estado,
            };



        //usamos la funcion para actualizar
        modeloMercancia.updateMercancia(datosMercancia, function (error, data)
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
        }else //si hay algún error
        {
        res.status(500).json({ "msg": "Ingrese un id valido" });
        }
    });


    //exportamos el objeto para tenerlo disponible en EL APP
    return router;
}
