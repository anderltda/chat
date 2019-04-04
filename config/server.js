/* importar o modulo do framework express */
const express = require('express');
/* importar o modulo do express */
const consign = require('consign');
/* importar o modulo do body-parser */
const bodyParser = require('body-parser');
/* importar o modulo do express-validator */
const expressValidator = require('express-validator');

/* iniciar o objeto do express */
var app = express();

/* setar as variavies 'view engine' e 'views' do express */ 
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({ extended: true }));

/* configurar o middleware express-validator */
app.use(expressValidator());

/* efetua o autoload das rotas, models e dos controllers para o objeto app*/ 
consign().include('app/routes')
        .then('app/models')
        .then('app/controllers')
        .into(app);

/* exportar o objeto app */
module.exports = app;