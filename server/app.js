var express = require('express');
var cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var debug = require('debug')('signora:server');

//var port = normalizePort(process.env.PORT || '4101');
var port = normalizePort('4101');
var app = express();
// var http = require('https');
var http = require('http');

 // var privateKey  = fs.readFileSync('./certs/stagingsdei_com.key', 'utf8');
 // var certificate = fs.readFileSync('./certs/c86aaff33f318ca4.crt', 'utf8');
 // var ca = fs.readFileSync('./certs/gd_bundle-g2-g1.crt');
 // var httpsOptions = {key: privateKey, cert: certificate, ca: ca};


var server = http.createServer(app);
// var server = http.createServer(httpsOptions,app);

var jwt = require('jsonwebtoken');
var encKey='shhhhh';
// sign with RSA SHA256
//var cert = fs.readFileSync('private.key');  // get private key
//var token = jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256'});

// sign asynchronously
//jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256' }, function(err, token) {
//console.log(token);
//});
var transcriptions = require('./routes/transcriptions');
var recommendations = require('./routes/recommendations');
var users = require('./routes/users');
var patient = require('./routes/patient');
//var app = express();

// Bootstrap models
var models_path = __dirname + '/model';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        //console.log(file);
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
};
walk(models_path);

mongoose.connect('mongodb://localhost/audiosynthesizer',{useMongoClient:true});
mongoose.Promise = global.Promise;
process.on('unhandledRejection', up => { return up })
var Schema = mongoose.Schema;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//Serves all the request which includes /uploads in the url from Uploads folder
app.use('/uploads', express.static(__dirname + '/uploads'));
app.set('view engine', 'jade');

const corsOptions = {
  // 'origin': 'https://stagingsdei.com',
  'origin': 'http://localhost:3000',
  'methods': ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTION' ],
  'credentials': true,
  'exposedHeaders': ['Cache-Control', 'Content-Encoding', 'Content-Range'],
  'allowedHeaders': ['Content-Type', 'Authorization', 'Range'],
  'preflightContinue': false,
}

app.use(cors(corsOptions))
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var callSocket = function (req, res, next) {
  io.sockets.emit("test", "testing");
  next()
}


app.use('/user', users)
app.use('/recommendations', recommendations)
app.use('/transcriptions', callSocket, transcriptions)
app.use('/patient', patient)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.set('port', port);
console.log("port", port)

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
var io = require('socket.io')(server);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
  var clients = [];
  io.sockets.on("connection", function(data){
    clients.push(data.id);
    var user = require("./controllers/users");
    jwt.verify(data.request._query.token, encKey, function(err, decoded) {
      if(!err){
        user.update(decoded["_doc"],data.id);
      }  
    });
    data.on('disconnect', function() {
      var i = clients.indexOf(data.id);
      clients.splice(i, 1);
    });
  })

 process.on('watson', function(obj) {    
  emitSocket(obj.user,"transcript",obj);
 })
 process.on('tone', function(arr){    
  emitSocket(arr.user,"tone",arr);
 })
 process.on('recommendations',function(arr){  
  emitSocket(arr.user,"recommendations",arr);
 })
 process.on('danger',function(arr){    
  emitSocket(arr.user,"danger",arr);
 })
 process.on('sentiment',function(arr){
  emitSocket(arr.user,"sentiment",arr);  
 })
 process.on('transcriptionId',function(arr){
  emitSocket(arr.user,"transcriptionId",arr);  
 })

function emitSocket(user, name, obj){
  
  var newusr=[];
  for(var i=0; i<user.length; i++){
    for(var j=0; j<clients.length; j++){
      if(user[i]==clients[j]){
        newusr.push(clients[j]);
      }
    }
  }
  for(var i=0; i<newusr.length; i++){
    io.sockets.connected[newusr[i]].emit(name,obj);
  }
}
