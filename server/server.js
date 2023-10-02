const io = require("socket.io")(3002, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("new connection");

  socket.on("message", (msg, romeid) => {
    if (romeid.lenght) io.to(romeid).emit("message", msg);
    else io.emit("message", msg);
  });
  socket.on("joinRommID", (romeid) => {
    // io.emit("message", msg);
    socket.join(romeid);
    console.log("join rome ", romeid);
  });
});

console.log("hell");
