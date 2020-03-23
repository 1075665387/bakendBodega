var connection = require('../Conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var ModeloEnvio = {};

//---------------------------------------------------------------
//obtenemos todo
ModeloEnvio.getListarEnvio = function (callback)
{
    if (connection)
    {
        var sql = "SELECT id_envio, fecha_envio, destino, e.peso,nombre_mercancia as mercancia "
                        +", e.cantidad,t.nombre_tipo_vehiculo as tipo_vehiculo"
                        +", nombre_marca_vehiculo as marca_vehiculo,v.placa_vehiculo"
                        +", concat(primer_nombre,' ',primer_apellido,' ',segundo_apellido) as conductor "
                        +" FROM envios e "
                        +" INNER JOIN (mercancias m) ON (e.id_mercancia=m.id_mercancia) "
                        +" INNER JOIN (vehiculos v INNER JOIN tipo_vehiculos t ON v.id_tipo_vehiculo=t.id_tipo_vehiculo) "
                        +" ON (e.id_vehiculo=v.id_vehiculo) "
                        +" INNER JOIN (vehiculos ve INNER JOIN marca_vehiculos mar ON ve.id_marca_vehiculo=mar.id_marca_vehiculo) "
                        +" ON (e.id_vehiculo=ve.id_vehiculo)"
                        +" INNER JOIN (vehiculos veh INNER JOIN conductores c ON veh.id_conductor=c.id_conductor) "
                        +" ON (e.id_vehiculo=veh.id_vehiculo)"
                        +" ORDER BY conductor;";
        
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
ModeloEnvio.getFiltrarEnvio= function (id, callback)
{
    if (connection)
    {
        var sql = "SELECT id_envio, fecha_envio, destino, e.peso,nombre_mercancia as mercancia "
                        +", e.cantidad,t.nombre_tipo_vehiculo as tipo_vehiculo"
                        +", nombre_marca_vehiculo as marca_vehiculo,v.placa_vehiculo"
                        +", concat(primer_nombre,' ',primer_apellido,' ',segundo_apellido) as conductor "
                        +" FROM envios e "
                        +" INNER JOIN (mercancias m) ON (e.id_mercancia=m.id_mercancia) "
                        +" INNER JOIN (vehiculos v INNER JOIN tipo_vehiculos t ON v.id_tipo_vehiculo=t.id_tipo_vehiculo) "
                        +" ON (e.id_vehiculo=v.id_vehiculo) "
                        +" INNER JOIN (vehiculos ve INNER JOIN marca_vehiculos mar ON ve.id_marca_vehiculo=mar.id_marca_vehiculo) "
                        +" ON (e.id_vehiculo=ve.id_vehiculo)"
                        +" INNER JOIN (vehiculos veh INNER JOIN conductores c ON veh.id_conductor=c.id_conductor) "
                        +" ON (e.id_vehiculo=veh.id_vehiculo)"
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
//añadir un nuevo registro
ModeloEnvio.crearEnvio = function (DatosEnvio, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO envios SET ?";

        connection.query(sql, DatosEnvio, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null,{"msg": "Envio Insertado"});
            }
        });
    }
}

//---------------------------------------------------------------
//actualizar un registro
ModeloEnvio.updateEnvio = function (DatosEnvio, callback)
 {

    if (connection)
    {
        var sql = "UPDATE envios SET "
                    +" id_envio = " + connection.escape(DatosEnvio.id_envio)
                    +", fecha_envio = " + connection.escape(DatosEnvio.fecha_envio)
                    +", destino = " + connection.escape(DatosEnvio.destino)
                    +", peso = " + connection.escape(DatosEnvio.peso)
                    +", id_mercancia = " + connection.escape(DatosEnvio.id_mercancia)
                    +", id_vehiculo = " + connection.escape(DatosEnvio.id_vehiculo)
                    +", cantidad = " + connection.escape(DatosEnvio.cantidad)
                    + " WHERE  id_envio  =  " + connection.escape(DatosEnvio.id_envio)+";";

        connection.query(sql, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg": "Envio  Actualizado"});
            }
        });
    }
}

//---------------------------------------------------------------
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = ModeloEnvio;
