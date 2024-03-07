const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', function connection(ws) {
    console.log('Client connected'); // Log pesan saat klien terhubung ke server WebSocket

    ws.on('message', function incoming(message) {
        console.log('Received:', message); // Log pesan yang diterima dari klien
        // Teruskan pesan ke semua klien yang terhubung
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString()); // Kirim pesan sebagai string
            }
        });
    });

    ws.on('close', function close() {
        console.log('Client disconnected'); // Log pesan saat klien terputus dari server WebSocket
    });
});

// Contoh kode untuk mengirimkan pesan yang memerintahkan pemutaran video
// Misalnya, ketika pengontrol video (Website 1) mengirimkan pesan "play", server akan mengirimkan pesan "play" ke semua klien (Website 2).
// Jika perintah lain diperlukan, kamu dapat menyesuaikan logika ini.
function sendPlayCommand() {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send('play');
        }
    });
}

// Contoh pemanggilan fungsi sendPlayCommand() untuk mengirimkan pesan "play" ke semua klien saat diperlukan.
// Misalnya, kamu dapat memanggilnya saat tombol "Play" ditekan di pengontrol video (Website 1).
