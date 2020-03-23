var connection = require('../Conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var ModeloMarcaMer = {};

//---------------------------------------------------------------
//obtenemos todo
ModeloMarcaMer.getListarMarcaMer = function (callback)
{
    if (connection)
    {
        var sql = "SELECT * "
                        +" FROM marca_mercancias  "
                        +" ORDER BY nombre_marca_mercancia ;";
        
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
ModeloMarcaMer.getFiltrarMarcaMer = function (id, callback)
{
    if (connection)
    {
        var sql = "SELECT * "
                        +" FROM marca_mercancias  "
                        +" WHERE id_marca_mercancia  = " 
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
ModeloMarcaMer.crearMarcaMer = function (DatosMarcaMer, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO marca_mercancias SET ?";

        connection.query(sql, DatosMarcaMer, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null,{"msg": "Marca de mercancia Insertada"});
            }
        });
    }
}

//---------------------------------------------------------------
//actualizar un registro
ModeloMarcaMer.updateMarcaMer = function (DatosMarcaMer, callback)
 {

    if (connection)
    {
        var sql = "UPDATE marca_mercancias SET nombre_marca_mercancia = " + connection.escape(DatosMarcaMer.nombre_marca_mercancia)
                    + " WHERE  id_marca_mercancia  =  " + connection.escape(DatosMarcaMer.id_marca_mercancia)+";";

        connection.query(sql, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg": "marca mercancia Actualizada"});
            }
        });
    }
}

//---------------------------------------------------------------
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = ModeloMarcaMer;
