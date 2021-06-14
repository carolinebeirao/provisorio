process.env.NODE_ENV = 'dev'; // altere para 'production' ou 'dev'

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var pacientesRouter = require('./routes/pacientes');
var medicosRouter = require('./routes/medicos');
var leiturasRouter = require('./routes/leituras');


var app = express();

app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/pacientes', pacientesRouter);
app.use('/medicos', medicosRouter);
app.use('/leituras', leiturasRouter);


module.exports = app;
