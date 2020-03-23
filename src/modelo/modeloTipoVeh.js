var connection = require('../Conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var ModeloTipoVeh = {};

//---------------------------------------------------------------
//LISTAR TIPO VEHICULO PARA LA ETIQUETA SELECT
ModeloTipoVeh.getListarTipoVeh = function (callback)
{
    if (connection)
    {
        var sql = "SELECT * "
                         +" FROM tipo_vehiculos  "
                        +" ORDER BY nombre_tipo_vehiculo ;";
        
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
//obtenemos filtro por id
ModeloTipoVeh.getFiltrarTipoVeh = function (id, callback)
{
    if (connection)
    {
        var sql = "SELECT * "
                        +" FROM tipo_vehiculos  "
                        +" WHERE id_tipo_vehiculo  = " 
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
//añadir un nuevo registro
ModeloTipoVeh.crearTipoVeh = function (DatosTipoVeh, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO tipo_vehiculos SET ?";

        connection.query(sql, DatosTipoVeh, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null,{"msg": "Tipo Vehículo Insertado"});
            }
        });
    }
}

//---------------------------------------------------------------
//actualizar un registro
ModeloTipoVeh.updateTipoVeh = function (DatosTipoVeh, callback)
 {

    if (connection)
    {
        var sql = "UPDATE tipo_vehiculos SET nombre_tipo_vehiculo = " + connection.escape(DatosTipoVeh.nombre_tipo_vehiculo)
                    + " WHERE  id_tipo_vehiculo  =  " + connection.escape(DatosTipoVeh.id_tipo_vehiculo)+";";

        connection.query(sql, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg": "Tipo vehiculo Actualizado"});
            }
        });
    }
}

//---------------------------------------------------------------
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = ModeloTipoVeh;
