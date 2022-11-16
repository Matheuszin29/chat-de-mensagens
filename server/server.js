const  Koa =  require('Koa');
const http =  require('http');
const  socket =  require('socket.io');

//função de requerimento da aplicação Koa 
const app  = new Koa() ;
//criação de uma requisição http
const server = http.createServer(app.callback);
// chamada de função socket . mandando escutar as requisições de serviço http
const io = socket(server);


const SERVER_PORT  = 8080 ;
const SERVER_HOST = 'localhost' ;

//a possivel falha se encontra aqui . o socket não esta capitando a conecção

io.on('connection', socket => {
    console.log('[IO] Connection => Server has a new connection')
    //chat.massage é a variavel que estabelece a conecção entre o server e o chat
    socket.on('chat.message', data => {
        console.log('[SOCKET] Chat.message => ', data)
        io.emit('chat.message', data)
    })
    socket.on('disconnect', () => {
        console.log('[SOCKET] Disconnect => A connection was disconnected')
    })
})
server.listen(SERVER_PORT ,SERVER_HOST ,()=>{
    console.log(`http://${SERVER_HOST}:${SERVER_PORT}`)
    console.log('ctrl+c for stop')
})

