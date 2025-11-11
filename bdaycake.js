// Data warna konfeti yang dibuat dengan CSS-Only
const confettiColors = ['#ff4e50', '#fc913a', '#f9d62e', '#a8e063', '#4bc0c8', '#8e2de2']; 
let candlesLit = 5;

// Fungsi yang dipanggil saat api lilin diklik
function blowOut(flameElement) {
    if (flameElement.classList.contains('out')) {
        return; // Lilin sudah padam, tidak melakukan apa-apa
    }

    flameElement.classList.add('out');
    flameElement.parentNode.setAttribute('data-lit', 'false');
    candlesLit--;

    // Periksa jika semua lilin sudah padam
    if (candlesLit === 0) {
        triggerCelebration();
    }
}

// Fungsi untuk memulai animasi Konfeti dan Pesan Ucapan
function triggerCelebration() {
    const messageContainer = document.querySelector('.message-container');
    const confettiContainer = document.getElementById('confetti-container');

    // 1. Tampilkan dan Animasi Pesan Ucapan
    messageContainer.style.opacity = 1;
    messageContainer.classList.add('float-up');

    // 2. Mulai Animasi Konfeti
    confettiContainer.style.display = 'block';
    createConfetti(100); // Buat 100 buah konfeti
}

// Fungsi untuk membuat Konfeti (visual murni CSS, posisi/animasi dengan JS)
function createConfetti(count) {
    const container = document.getElementById('confetti-container');
    
    for (let i = 0; i < count; i++) {
        const confetto = document.createElement('div');
        confetto.classList.add('confetto');
        
        // Pilih warna acak dari daftar CSS-Only
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetto.style.backgroundColor = color;
        
        // Atur posisi awal acak di atas layar
        confetto.style.left = Math.random() * 100 + 'vw';
        confetto.style.top = -10 + 'px';
        
        // Atur animasi jatuh acak
        const duration = Math.random() * 3 + 2; // Durasi 2s hingga 5s
        const delay = Math.random() * 0.5; // Tunda 0s hingga 0.5s
        
        confetto.style.animation = `fall ${duration}s ${delay}s forwards`;
        confetto.style.animationTimingFunction = `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()})`;
        
        container.appendChild(confetto);
    }
    
    // Tambahkan @keyframes fall ke CSS (karena tidak bisa langsung di JS, kita gunakan cara ini)
    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = `
        @keyframes fall {
            to {
                transform: translate3d(0, 100vh, 0) rotate(720deg);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(styleSheet);
}
