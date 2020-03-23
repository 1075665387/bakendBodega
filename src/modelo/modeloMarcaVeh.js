var connection = require('../Conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var ModeloMarcaVeh = {};

//---------------------------------------------------------------
//obtenemos todo
ModeloMarcaVeh.getListarMarcaVeh = function (callback)
{
    if (connection)
    {
        var sql = "SELECT * "
                        +" FROM marca_vehiculos  "
                        +" ORDER BY nombre_marca_vehiculo ;";
        
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
ModeloMarcaVeh.getFiltrarMarcaVeh = function (id, callback)
{
    if (connection)
    {
        var sql = "SELECT * "
                        +" FROM marca_vehiculos  "
                        +" WHERE id_marca_vehiculo  = " 
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
ModeloMarcaVeh.crearMarcaVeh = function (DatosMarcaVeh, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO marca_vehiculos SET ?";

        connection.query(sql, DatosMarcaVeh, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null,{"msg": "Marca Vehículo Insertada"});
            }
        });
    }
}

//---------------------------------------------------------------
//actualizar un registro
ModeloMarcaVeh.updateMarcaVeh = function (DatosMarcaVeh, callback)
 {

    if (connection)
    {
        var sql = "UPDATE marca_vehiculos SET nombre_marca_vehiculo = " + connection.escape(DatosMarcaVeh.nombre_marca_vehiculo)
                    + " WHERE  id_marca_vehiculo  =  " + connection.escape(DatosMarcaVeh.id_marca_vehiculo)+";";

        connection.query(sql, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg": "marca vehiculo Actualizada"});
            }
        });
    }
}

//---------------------------------------------------------------
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = ModeloMarcaVeh;
