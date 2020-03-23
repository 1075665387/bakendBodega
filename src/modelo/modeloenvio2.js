var connection = require('../Conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var ModeloEnvio2 = {};


//obtenemos filtro por id para modificar el envio en el front end
ModeloEnvio2.getFiltrarEnvio2= function (id, callback)
{
    if (connection)
    {
        var sql = "SELECT * FROM envios "
                        
                        +" WHERE id_envio = " 
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
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = ModeloEnvio2;
