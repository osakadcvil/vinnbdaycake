// Data warna konfeti
const confettiColors = ['#ff4e50', '#fc913a', '#f9d62e', '#a8e063', '#4bc0c8', '#8e2de2']; 
let candlesLit = 5; // Jumlah lilin awal
let giftBoxOpened = false; // Status kotak kado

// Fungsi yang dipanggil saat kotak kado diklik
function openGift() {
    if (giftBoxOpened) return; // Jika sudah terbuka, jangan lakukan apa-apa lagi

    const giftBox = document.getElementById('giftBox');
    const cakeContainer = document.getElementById('cakeContainer');
    
    giftBox.classList.add('open'); // Memicu animasi membuka kotak
    giftBoxOpened = true;

    // Sembunyikan kotak setelah animasi (setelah 0.5 detik)
    setTimeout(() => {
        giftBox.style.display = 'none';
        cakeContainer.classList.remove('hidden'); // Tampilkan kue
        
        // Beri sedikit delay sebelum menganimasikan kue agar transisi lebih mulus
        setTimeout(() => {
            cakeContainer.classList.add('visible'); // Animasikan kue muncul
        }, 50); 
    }, 500); // Sesuaikan dengan durasi transisi CSS .box-top
}


// Fungsi yang dipanggil saat api lilin diklik (Sama seperti sebelumnya)
function blowOut(flameElement) {
    if (flameElement.classList.contains('out')) {
        return;
    }

    flameElement.classList.add('out');
    flameElement.parentNode.setAttribute('data-lit', 'false');
    candlesLit--;

    if (candlesLit === 0) {
        triggerCelebration();
    }
}

// Fungsi untuk memulai animasi Konfeti dan Pesan Ucapan (Sama seperti sebelumnya)
function triggerCelebration() {
    const messageContainer = document.querySelector('.message-container');
    const confettiContainer = document.getElementById('confetti-container');

    messageContainer.style.opacity = 1;
    messageContainer.classList.add('float-up');

    confettiContainer.style.display = 'block';
    createConfetti(100);
}

// Fungsi untuk membuat Konfeti (Sama seperti sebelumnya)
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
        
        confetto.style.animation = `fall ${duration}s ${delay}s forwards`;
        confetto.style.animationTimingFunction = `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()})`;
        
        container.appendChild(confetto);
    }
    
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
