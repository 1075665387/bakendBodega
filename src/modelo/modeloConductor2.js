var connection = require('../Conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var ModeloConductor2 = {};


//obtenemos filtro por id para modificar el envio en el front end
ModeloConductor2.getFiltrarConductor2= function (id, callback)
{
    if (connection)
    {
        var sql = "SELECT * FROM conductores "
                        
                        +" WHERE id_conductor = " 
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
module.exports = ModeloConductor2;
