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
	socket.on("ClientSendColor",function(color){
		console.log(socket.id + " send " + color);
		// io.sockets.emit("SeverSendColor", color);
		socket.broadcast.emit("SeverSendColor", color);
	})
});

app.get("/", function(req, res){
	res.render("trangchu");
});