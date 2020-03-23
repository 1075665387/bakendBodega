var express = require('express');//guarda express que nosotros intalamos
var bodyParser = require('body-parser'), port = 3000;//rmanejo de cuerpo de la "pagina" y puerto
var http = require('http');//protocolo de intercambio de archivos
var path = require('path');//direccion


var tipdocu = require('./src/rutas/tipdocruta');//ruta
var color = require('./src/rutas/rutacolor');//ruta color
var marcaMer = require('./src/rutas/rutaMarcaMer');//ruta marMer
var marcaVeh = require('./src/rutas/rutaMarcaVeh');//ruta marVeh
var tipoVeh = require('./src/rutas/rutaTipoVeh');//ruta tipoVeh
var conductor = require('./src/rutas/rutaConductor');//ruta conductor
var mercancia = require('./src/rutas/rutaMercancia');//ruta mercancia
var vehiculo = require('./src/rutas/rutaVehiculo');//ruta vehiculo
var envio = require('./src/rutas/rutaEnvio');//ruta envio
var destinos = require('./src/rutas/rutadestino');//ruta destino
var infomercancia = require('./src/rutas/rutainformemercancia');//ruta
var infovehiculo = require('./src/rutas/rutainformevehiculo');//ruta
var envio2 = require('./src/rutas/rutaenvio2');
var mercancia2 = require('./src/rutas/rutaMercancia2');//ruta mercancia
var vehiculo2 = require('./src/rutas/rutaVehiculo2');//ruta vehiculo
var conductor2 = require('./src/rutas/rutaConductor2');


var app = express();//recibe un constructor

// todos los entornos
app.set('port', process.env.PORT || port);//metodo para recibir puerto y proceso
app.use(bodyParser.json({type: 'application/json', limit: '10mb'}));//recibe un cuerpo y un objeto json
app.use(bodyParser.urlencoded({extended: false}));//recibe url codificada
app.use(express.static(path.join(__dirname, 'public')));//recibe direccion

//======================================================================

app.use(function (req, res, next)
{

    // Stio web al que desea permitir que se conecte
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // A que métodos que desea dar permisos
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // A que  encabezados se les va a dar permiso
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    //Establezca en verdadero si necesita que el sitio web incluya cookies en las solicitudes enviadas
    //a la API (por ejemplo, en caso de que use sesiones)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pase a la siguiente capa de middleware
    next();
  });

  //============================================================


  app.use('/tipdocu', tipdocu());//ruta para el servicio
  app.use('/color', color());//ruta para el servicio
  app.use('/marcaMer', marcaMer());//ruta para el servicio
  app.use('/marcaVeh', marcaVeh());//ruta para el servicio
  app.use('/tipoVeh', tipoVeh());//ruta para el servicio
  app.use('/conductor', conductor());//ruta para el servicio
  app.use('/mercancia', mercancia());//ruta para el servicio
  app.use('/vehiculo', vehiculo());//ruta para el servicio
  app.use('/envio', envio());//ruta para el servicio
  app.use('/destinos', destinos());//ruta para el servicio
  app.use('/infomercancia', infomercancia());//ruta para el servicio
  app.use('/infovehiculo', infovehiculo());//ruta para el servicio
  app.use('/envio2', envio2());//ruta para el servicio
  app.use('/mercancia2', mercancia2());//ruta para el servicio
  app.use('/vehiculo2', vehiculo2());//ruta para el servicio
  app.use('/conductor2', conductor2());


http.createServer(app).listen(app.get('port'), function ( )
{
    console.log('Servidor Express escuchando por el puerto ' + app.get('port'));
});


module.exports = app;

