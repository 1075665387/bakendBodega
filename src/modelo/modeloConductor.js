var connection = require('../Conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var ModeloConductor = {};

//---------------------------------------------------------------
//obtenemos todo
ModeloConductor.getListarConductor = function (callback)
{
    if (connection)
    {
        var sql = "SELECT id_conductor,nombre_tipo_documento as id_tipo_documento,numero_documento"
                        +",primer_nombre,segundo_nombre"
                        +",primer_apellido,segundo_apellido"
                        +",direccion,numero_telefono,numero_licencia"
                        +",fecha_venci_licencia,estado"
                        +" FROM conductores c "
                        +" INNER JOIN (tipo_documentos t) "
                        +" ON (c.id_tipo_documento=t.id_tipo_documento) "
                        +" ORDER BY primer_nombre;";
        
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
ModeloConductor.getFiltrarConductor = function (id, callback)
{
    if (connection)
    {
        var sql = "SELECT id_conductor,nombre_tipo_documento as id_tipo_documento,numero_documento"
                        +",primer_nombre,segundo_nombre"
                        +",primer_apellido,segundo_apellido"
                        +",direccion,numero_telefono,numero_licencia"
                        +",fecha_venci_licencia,estado"
                        +" FROM conductores c "
                        +" INNER JOIN (tipo_documentos t) "
                        +" ON (c.id_tipo_documento=t.id_tipo_documento) "
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
//añadir un nuevo registro
ModeloConductor.crearConductor = function (DatosConductor, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO conductores SET ?";

        connection.query(sql, DatosConductor, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null,{"msg": "Conductor Insertado"});
            }
        });
    }
}

//---------------------------------------------------------------
//actualizar un registro
ModeloConductor.updateConductor = function (DatosConductor, callback)
 {

    if (connection)
    {
        var sql = "UPDATE conductores SET "
                    +" id_tipo_documento = " + connection.escape(DatosConductor.id_tipo_documento)
                    +", numero_documento = " + connection.escape(DatosConductor.numero_documento)
                    +", primer_nombre = " + connection.escape(DatosConductor.primer_nombre)
                    +", segundo_nombre = " + connection.escape(DatosConductor.segundo_nombre)
                    +", primer_apellido = " + connection.escape(DatosConductor.primer_apellido)
                    +", segundo_apellido = " + connection.escape(DatosConductor.segundo_apellido)
                    +", direccion = " + connection.escape(DatosConductor.direccion)
                    +", numero_telefono = " + connection.escape(DatosConductor.numero_telefono)
                    +", numero_licencia = " + connection.escape(DatosConductor.numero_licencia)
                    +", fecha_venci_licencia = " + connection.escape(DatosConductor.fecha_venci_licencia)
                    +", estado = " + connection.escape(DatosConductor.estado)
                    + " WHERE  id_conductor  =  " + connection.escape(DatosConductor.id_conductor)+";";

        connection.query(sql, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg": "conductor Actualizado"});
            }
        });
    }
}

//---------------------------------------------------------------
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = ModeloConductor;
