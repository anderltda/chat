/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta */
var server = app.listen(9090, function() {
    console.log('Servidor online');
});

var io = require('socket.io').listen(server);
app.set('io', io);

/* criar a conexão por websocket */
io.on('connection', function (socket) {

    console.log('Usuario conectou');
    
    socket.on('disconnect', function() {
        console.log('Usuario desconectou');
    })

    socket.on('msgParaServidor', function(data) {

        /* dialogo */
        socket.emit(
            'msgParaCliente', 
            { apelido: data.apelido, mensagem : data.mensagem}
        );

        socket.broadcast.emit(
            'msgParaCliente', 
            { apelido: data.apelido, mensagem : data.mensagem}
        );

        /* participantes */
        if(parseInt(data.apelido_atualizado) == 0) {
            socket.emit(
                'participantesParaClientes', 
                { apelido: data.apelido}
            );
    
            socket.broadcast.emit(
                'participantesParaClientes', 
                { apelido: data.apelido}
            );
        }
    });  
    
});