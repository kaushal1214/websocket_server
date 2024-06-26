
var logs = document.getElementById("msgLogs");
var messages = document.getElementById("messages");

connect();

var data = "";
var socket;
function connect() {
    const HOST = "ws://localhost:";
    const PORT = "3000";
    const PATH = "/aao/gappe/maare";

    var ws = new WebSocket(HOST + PORT + PATH);
    ws.onopen = function(){
        console.log("Connected to server");
        socket = ws;
    }

    ws.onmessage = function(message){
        console.log(message.data);
        data +=  message.data+ "\n";
        logs.innerHTML = data
    }
}

function send(){
    data += "Me: "+ messages.value+ "\n";
    logs.innerHTML = data
    socket.send(messages.value)
    messages.value = "";
}
