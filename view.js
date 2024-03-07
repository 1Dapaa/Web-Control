const socket = new WebSocket('ws://localhost:3000');

socket.onopen = function(event) {
    console.log('WebSocket connection established.');
};

socket.onmessage = function(event) {
    const command = event.data;
    console.log('Received message:', command); // Log pesan yang diterima dari server
    const video = document.getElementById('videoPlayer');
    if (command === 'play') {
        video.play();
        console.log('Video started playing.'); // Log pesan saat pemutaran video dimulai
    } else if (command === 'pause') {
        video.pause();
        console.log('Video paused.'); // Log pesan saat pemutaran video dihentikan
    }
};

socket.onerror = function(event) {
    console.error('WebSocket error:', event); // Log pesan kesalahan koneksi WebSocket
};

socket.onclose = function(event) {
    console.log('WebSocket connection closed.'); // Log pesan saat koneksi WebSocket ditutup
};
