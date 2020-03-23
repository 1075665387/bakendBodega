var connection = require('../Conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var ModeloVehiculo = {};

//---------------------------------------------------------------
//obtenemos todo
ModeloVehiculo.getListarVehiculo = function (callback)
{
    if (connection)
    {
        var sql = "SELECT id_vehiculo,nombre_tipo_vehiculo as id_tipo_vehiculo"
                        +",nombre_marca_vehiculo as id_marca_vehiculo"
                        +",nombre_color as id_color,modelo_vehiculo"
                        +",placa_vehiculo,capacidad_en_Tn"
                        +",concat(primer_nombre,' ',primer_apellido) as id_conductor"
                        +",v.estado"
                        +" FROM vehiculos v "
                        +" INNER JOIN (tipo_vehiculos tv) ON (v.id_tipo_vehiculo=tv.id_tipo_vehiculo) "
                        +" INNER JOIN (marca_vehiculos mv) ON (v.id_marca_vehiculo=mv.id_marca_vehiculo) "
                        +" INNER JOIN (colores c) ON (v.id_color=c.id_color) "
                        +" INNER JOIN (conductores con) ON (v.id_conductor=con.id_conductor) "
                        +" ORDER BY placa_vehiculo ;";
        
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
ModeloVehiculo.getFiltrarVehiculo= function (id, callback)
{
    if (connection)
    {
        var sql = "SELECT id_vehiculo,nombre_tipo_vehiculo as id_tipo_vehiculo"
                        +",nombre_marca_vehiculo as id_marca_vehiculo"
                        +",nombre_color as id_color,modelo_vehiculo"
                        +",placa_vehiculo,capacidad_en_Tn"
                        +",concat(primer_nombre,' ',primer_apellido) as id_conductor"
                        +",v.estado"
                        +" FROM vehiculos v "
                        +" INNER JOIN (tipo_vehiculos tv) ON (v.id_tipo_vehiculo=tv.id_tipo_vehiculo) "
                        +" INNER JOIN (marca_vehiculos mv) ON (v.id_marca_vehiculo=mv.id_marca_vehiculo) "
                        +" INNER JOIN (colores c) ON (v.id_color=c.id_color) "
                        +" INNER JOIN (conductores con) ON (v.id_conductor=con.id_conductor) "
                        +" WHERE id_vehiculo = " 
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
ModeloVehiculo.crearVehiculo = function (DatosVehiculo, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO vehiculos SET ?";

        connection.query(sql, DatosVehiculo, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null,{"msg": "Vehiculo Insertado"});
            }
        });
    }
}

//---------------------------------------------------------------
//actualizar un registro
ModeloVehiculo.updateVehiculo = function (DatosVehiculo, callback)
 {

    if (connection)
    {
        var sql = "UPDATE vehiculos SET "
                    +" id_vehiculo = " + connection.escape(DatosVehiculo.id_vehiculo)
                    +", id_tipo_vehiculo = " + connection.escape(DatosVehiculo.id_tipo_vehiculo)
                    +", id_marca_vehiculo = " + connection.escape(DatosVehiculo.id_marca_vehiculo)
                    +", id_color = " + connection.escape(DatosVehiculo.id_color)
                    +", modelo_vehiculo = " + connection.escape(DatosVehiculo.modelo_vehiculo)
                    +", placa_vehiculo = " + connection.escape(DatosVehiculo.placa_vehiculo)
                    +", capacidad_en_Tn = " + connection.escape(DatosVehiculo.capacidad_en_Tn)
                    +", id_conductor = " + connection.escape(DatosVehiculo.id_conductor)
                    +", estado = " + connection.escape(DatosVehiculo.estado)
                    + " WHERE  id_vehiculo  =  " + connection.escape(DatosVehiculo.id_vehiculo)+";";

        connection.query(sql, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg": "Vehiculo Actualizado"});
            }
        });
    }
}

//---------------------------------------------------------------
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = ModeloVehiculo;
