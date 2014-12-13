var express = require('express')
var http = require('http')
var path = require('path')
var gumMachine = require('./routes/gumMachine');

var app = express();

app.set('port',process.env.OPENSHIFT_NODEJS_PORT || 3020)
app.set('ip_address',process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1')
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', gumMachine.GumballMachinesInventory);
app.get('/gumballTransactions/:id', gumMachine.gumballTransactions);
app.post('/gumballTransactions/:id', gumMachine.updateMachine);
app.get('/GumballMachinesInventory', gumMachine.GumballMachinesInventory);
app.post('/addGumballMachine', gumMachine.addGumballMachine);
app.get('/addGumballMachine', gumMachine.addGumballMachine);
app.post('/GumballMachinesInventory', gumMachine.GumballMachinesInventory);
app.post('/SaveNewMachine', gumMachine.SaveNewMachine);


http.createServer(app).listen(app.get('port'), app.get('ip_address'),function(){
  console.log('Express server listening on port ' + app.get('port'));
});
