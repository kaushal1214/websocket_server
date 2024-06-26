/*--------------------------------------
 * Demo program for Websockets 
 * Batch: DIoT
 * Description: This program maintains two socket currently; you can add support for more sockets; Two clients instances can together chat using UI
 *-------------------------------------*/
const http = require('http');
const {WebSocketServer} = require('ws');
const { parse } = require('url');

const server = http.createServer();

const wsServer = new WebSocketServer({noServer: true});

// Handling Two Websockets for chating
var client1, client2;
wsServer.on("connection",function connection(client){
    if(!client1) {
        client1 = client;
    } else {
        client2 = client;
    
    client1.on("message", function message(data){
        console.log(data.toString());    
        client2.send("User1: "+ data.toString())  
    });    

    client2.on("message", function message(data){
        console.log(data.toString());    
        client1.send("User2: "+ data.toString())  
    });
}
});


// TO handle the Websocket connection request
server.on('upgrade',(request,socket, head)=>{
    const {pathname} = parse(request.url);

    if(pathname=="/aao/gappe/maare") {
        wsServer.handleUpgrade(request,socket,head, function done(ws){
            console.log('A new socket created')
            wsServer.emit('connection',ws, request);
        })
    } else {
        socket.destroy();
    }
})
const PORT = 3000;
server.listen(3000, ()=>{
    console.log(`Websocket Server is running at: 127.0.0.1:${PORT} Port`);
});