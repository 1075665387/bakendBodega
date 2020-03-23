var connection = require('../Conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var ModeloColores = {};

//---------------------------------------------------------------
//obtenemos todos los tipos de documento
ModeloColores.getListarColores = function (callback)
{
    if (connection)
    {
        var sql = "SELECT * "
                        +" FROM colores  "
                        +" ORDER BY nombre_color ;";
        
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
ModeloColores.getFiltrarColor = function (id, callback)
{
    if (connection)
    {
        var sql = "SELECT * "
                        +" FROM colores  "
                        +" WHERE id_color  = " 
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
ModeloColores.crearColor = function (DatosColor, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO colores SET ?";

        connection.query(sql, DatosColor, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null,{"msg": "Color Insertado"});
            }
        });
    }
}

//---------------------------------------------------------------
//actualizar un tipo de documento
ModeloColores.updateColor = function (DatosColor, callback)
 {

    if (connection)
    {
        var sql = "UPDATE colores SET nombre_color = " + connection.escape(DatosColor.nombre_color)
                    + " WHERE  id_color  =  " + connection.escape(DatosColor.id_color)+";";

        connection.query(sql, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg": "color Actualizado"});
            }
        });
    }
}

//---------------------------------------------------------------
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = ModeloColores;
