var connection = require('../Conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var TipDocModel = {};

//---------------------------------------------------------------
//obtenemos todos los tipos de documento
TipDocModel.getListarTipDocs = function (callback)
{
    if (connection)
    {
        var sql = "SELECT * "
                        +" FROM tipo_documentos  "
                        +" ORDER BY nombre_tipo_documento ;";
        
        connection.query(sql, function (error, rows) 
        {
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, rows);
            }
        });
    }
}

//---------------------------------------------------------------
//obtenemos un tipo doc por su id
TipDocModel.getFiltrarTipDoc = function (id, callback)
{
    if (connection)
    {
        var sql = "SELECT * "
                        +" FROM tipo_documentos  "
                        +" WHERE id_tipo_documento  = " 
                        + connection.escape(id) + ";";

        //console.log(id);

        connection.query(sql, function (error, row)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, row);
            }
        });
    }
}

//---------------------------------------------------------------
//añadir un nuevo tipo de documento
TipDocModel.insertTipDoc = function (DatosTipDoc, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO tipo_documentos SET ?";

        connection.query(sql, DatosTipDoc, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null,{"msg": "Registro Insertado"});
            }
        });
    }
}

//---------------------------------------------------------------
//actualizar un tipo de documento
TipDocModel.updateTipDoc = function (DatosTipDoc, callback)
 {

    if (connection)
    {
        var sql = "UPDATE tipo_documentos SET nombre_tipo_documento = " + connection.escape(DatosTipDoc.nombre_tipo_documento)
                    + ", ini_tipo_documento = " + connection.escape(DatosTipDoc.ini_tipo_documento)
                    + " WHERE  id_tipo_documento  =  " + connection.escape(DatosTipDoc.id_tipo_documento)+";";

        connection.query(sql, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg": "Registro Actualizado"});
            }
        });
    }
}

//---------------------------------------------------------------
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = TipDocModel;
