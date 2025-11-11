// Data warna konfeti
const confettiColors = ['#ff4e50', '#fc913a', '#f9d62e', '#a8e063', '#4bc0c8', '#8e2de2']; 
let candlesLit = 5; 
let giftBoxOpened = false; 

// FUNGSI UTAMA UNTUK MEMBUKA KOTAK
function openGift() {
    if (giftBoxOpened) return;

    const giftBox = document.getElementById('giftBox');
    const cakeContainer = document.getElementById('cakeContainer');
    
    giftBox.classList.add('open'); // Memicu animasi CSS kotak terbuka
    giftBoxOpened = true;

    // Sembunyikan kotak dan tampilkan kue setelah animasi (0.5 detik)
    setTimeout(() => {
        giftBox.style.display = 'none'; // Sembunyikan kotak sepenuhnya
        
        // 1. Hapus kelas 'hidden' untuk memungkinkan transisi kue
        cakeContainer.classList.remove('hidden'); 
        
        // 2. Tambahkan kelas 'visible' untuk memicu animasi fade-in dan float-up
        setTimeout(() => {
             cakeContainer.classList.add('visible'); 
        }, 50); // Delay kecil agar browser punya waktu menghapus 'hidden'
        
    }, 500); // Harus sinkron dengan durasi transisi tutup kotak di CSS
}


// FUNGSI UNTUK MEMADAMKAN LILIN
function blowOut(flameElement) {
    if (flameElement.classList.contains('out')) {
        return;
    }
    
    // Pastikan kotak sudah terbuka sebelum bisa memadamkan lilin
    if (!giftBoxOpened) {
        alert("Buka kotak kadonya dulu ya!");
        return;
    }

    flameElement.classList.add('out');
    flameElement.parentNode.setAttribute('data-lit', 'false');
    candlesLit--;

    if (candlesLit === 0) {
        triggerCelebration();
    }
}

// FUNGSI UNTUK MEMULAI PERAYAAN
function triggerCelebration() {
    const messageContainer = document.querySelector('.message-container');
    const confettiContainer = document.getElementById('confetti-container');

    // Tampilkan pesan ucapan
    messageContainer.style.opacity = 1;
    messageContainer.classList.add('float-up');

    // Mulai Konfeti
    confettiContainer.style.display = 'block';
    createConfetti(100);
}

// FUNGSI UNTUK MEMBUAT KONFETI
function createConfetti(count) {
    const container = document.getElementById('confetti-container');
    
    for (let i = 0; i < count; i++) {
        const confetto = document.createElement('div');
        confetto.classList.add('confetto');
        
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetto.style.backgroundColor = color;
        
        confetto.style.left = Math.random() * 100 + 'vw';
        confetto.style.top = -10 + 'px';
        
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 0.5;
        
        // Gunakan keyframes fall yang dibuat di bawah
        confetto.style.animation = `fall ${duration}s ${delay}s forwards`;
        confetto.style.animationTimingFunction = `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()})`;
        
        container.appendChild(confetto);
    }
    
    // Keyframes untuk animasi jatuh
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
