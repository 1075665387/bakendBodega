var connection = require('../Conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var ModeloDestino = {};

//---------------------------------------------------------------
//obtenemos todo
ModeloDestino.getListarDestino = function (callback)
{
    if (connection)
    {
        var sql = "SELECT destino, fecha_envio FROM envios "
                        +" ORDER BY destino;";
        
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
//obtenemos filtro por destino
ModeloDestino.getFiltrarDestino= function (destino, callback)
{
    if (connection)
    {   var desti=connection.escape(destino);
        var sql = "SELECT destino, fecha_envio FROM envios "
                        +" WHERE destino LIKE "+desti+";";

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
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = ModeloDestino;
