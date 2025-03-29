//const socket = new WebSocket("wss://arduino-sockets-production.up.railway.app");
//const socket = new WebSocket("wss://arduino-sockets-production.up.railway.app/ws");
//const socket = new WebSocket("wss://echo.websocket.org");
const socket = new WebSocket("ws://localhost:3000/ws");

socket.onopen = () => {
    console.log("✅ Conectado al WebSocket Server!")
    socket.send("Hola a ws desde el cliente!");

};
socket.onerror = (error) => console.log("❌ Error:", error);
socket.onmessage = (event) => console.log("📩 Mensaje recibido:", event.data);
socket.onclose = () => console.log("❌ Conexión cerrada!");