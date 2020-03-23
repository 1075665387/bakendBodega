var connection = require('../Conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var ModeloInformeMer = {};

//---------------------------------------------------------------
//obtenemos todo
ModeloInformeMer.getInformeMer = function (nombre,fecha1,fecha2,callback)
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
                        +" WHERE nombre_mercancia = " + connection.escape(nombre)
                        +" AND fecha_envio >= " + connection.escape(fecha1)
                        +" AND fecha_envio < " + connection.escape(fecha2)
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
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = ModeloInformeMer;
