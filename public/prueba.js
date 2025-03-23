//const socket = new WebSocket("wss://arduino-sockets-production.up.railway.app");
const socket = new WebSocket("ws://localhost:3000/ws");

socket.onopen = () => console.log("✅ Conectado al WebSocket Server!");
socket.onerror = (error) => console.log("❌ Error:", error);
socket.onmessage = (event) => console.log("📩 Mensaje recibido:", event.data);
