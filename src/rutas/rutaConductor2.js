//obtenemos el modelo 
var modeloEnvio2 = require('../modelo/modeloConductor2');
var express = require('express');
var router = express.Router();



//creamos el ruteo de la clase
module.exports = function ()
{

    

    router.get("/:id", function (req, res)
    {
        var id = req.params.id;

        //solo actualizamos si el id es un número
        if (!isNaN(id))
        {
            modeloEnvio2.getFiltrarConductor2(id, function (error, data)
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


    
    //exportamos el objeto para tenerlo disponible en EL APP
    return router;
}
