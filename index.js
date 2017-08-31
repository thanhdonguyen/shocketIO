var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

io.on("connection", function(socket){
	console.log("People connection : " + socket.id);
	socket.on("disconnect", function(){
		console.log(socket.id + ": Disconnect");
	});
	socket.on("ClientSendData", function(data){
		console.log(socket.id + " send " + data);
		// io.sockets.emit("SeverSendData", data+"888"); //gui cho tat ca
		// socket.emit("SeverSendData", data);//gui cho chinh no
		socket.broadcast.emit("SeverSendData", data); //gui cho tat ca tru chinh no
	});
});

app.get("/", function(req, res){
	res.render("trangchu");
});