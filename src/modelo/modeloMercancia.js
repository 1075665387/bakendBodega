var connection = require('../Conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var ModeloMercancia = {};

//---------------------------------------------------------------
//obtenemos todo
ModeloMercancia.getListarMercancia = function (callback)
{
    if (connection)
    {
        var sql = "SELECT id_mercancia, nombre_marca_mercancia as id_marca_mercancia "
                        +", codigo_mercancia, nombre_mercancia "
                        +", precio_compra_mercancia, precio_venta_mercancia"
                        +", peso, m.estado"
                        +" FROM mercancias m "
                        +" INNER JOIN (marca_mercancias mar) ON (m.id_marca_mercancia=mar.id_marca_mercancia) "
                        +" ORDER BY nombre_mercancia ;";
        
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

// LISTAR LAS MARCAS PARA LA ETIQUETA SELECT
ModeloMercancia.getListarMarcas = function (callback)
{
    if (connection)
    {
        var sql = "SELECT  * FROM marca_mercancias "
                        +" ORDER BY nombre_marca_mercancia;";
        
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
ModeloMercancia.getFiltrarMercancia= function (id, callback)
{
    if (connection)
    {
        var sql = "SELECT id_mercancia, nombre_marca_mercancia as id_marca_mercancia "
                        +", codigo_mercancia, nombre_mercancia "
                        +", precio_compra_mercancia, precio_venta_mercancia"
                        +", peso, m.estado"
                        +" FROM mercancias m "
                        +" INNER JOIN (marca_mercancias mar) ON (m.id_marca_mercancia=mar.id_marca_mercancia) "
                        +" WHERE id_mercancia = " 
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
ModeloMercancia.crearMercancia = function (DatosMercancia, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO mercancias SET ?";

        connection.query(sql, DatosMercancia, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null,{"msg": "Mercancia Insertada"});
                
                
            }
        });
    }
}

//---------------------------------------------------------------
//actualizar un registro
ModeloMercancia.updateMercancia = function (DatosMercancia, callback)
 {

    if (connection)
    {
        var sql = "UPDATE mercancias SET "
                    +" id_mercancia = " + connection.escape(DatosMercancia.id_mercancia)
                    +", id_marca_mercancia = " + connection.escape(DatosMercancia.id_marca_mercancia)
                    +", codigo_mercancia = " + connection.escape(DatosMercancia.codigo_mercancia)
                    +", nombre_mercancia = " + connection.escape(DatosMercancia.nombre_mercancia)
                    +", precio_compra_mercancia = " + connection.escape(DatosMercancia.precio_compra_mercancia)
                    +", precio_venta_mercancia = " + connection.escape(DatosMercancia.precio_venta_mercancia)
                    +", peso = " + connection.escape(DatosMercancia.peso)
                    +", estado = " + connection.escape(DatosMercancia.estado)
                    + " WHERE  id_mercancia  =  " + connection.escape(DatosMercancia.id_mercancia)+";";

        connection.query(sql, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg": "mercancia Actualizada"});
            }
        });
    }
}

//---------------------------------------------------------------
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = ModeloMercancia;
