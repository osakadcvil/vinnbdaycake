// --- bdaycake.js (KODE LENGKAP) ---

const totalCandles = 5;
let blownOutCount = 0;
const confettiContainer = document.getElementById('confetti-container');
const candleSet = document.querySelector('.candle-set'); 

// Palet warna yang standar
const confettiColors = [
    '#ff6f69', '#ffcc5c', '#88d8b0', '#6b5b95', '#e0b7ff', '#f7a399'
];

// FUNGSI KONFETI (VERSI NORMAL)
function generateConfetti() {
    const confettiCount = 80; // Disesuaikan menjadi normal (tidak terlalu banyak)
    
    for (let i = 0; i < confettiCount; i++) {
        const confetto = document.createElement('div');
        confetto.classList.add('confetto');
        
        const randomColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        
        confetto.style.backgroundColor = randomColor;
        confetto.style.left = Math.random() * 100 + 'vw'; 
        
        // Durasi jatuh yang standar (4s - 6s)
        const duration = (Math.random() * 2) + 4; 
        confetto.style.animationDuration = duration + 's';
        
        confetto.style.animationDelay = (Math.random() * 0.2) + 's'; // Penundaan lebih singkat

        confettiContainer.appendChild(confetto);

        confetto.addEventListener('animationend', () => {
            confetto.remove();
        });
    }
}


function openGift() {
    const giftBox = document.getElementById('giftBox');
    const cakeContainer = document.getElementById('cakeContainer');
    const congratsMessage = document.getElementById('congrats-message');
    
    if (giftBox.classList.contains('open')) {
        return; 
    }

    // 1. Kotak kado terbuka
    giftBox.classList.add('open');
    congratsMessage.innerText = 'Lihat Kuemu! Sekarang Klik Lilinnya🕯️';

    setTimeout(() => {
        // Sembunyikan kado dan pesan setelah terbuka
        giftBox.style.opacity = '0';
        giftBox.style.pointerEvents = 'none';
        
        // KUE MUNCUL
        cakeContainer.classList.remove('hidden');
        cakeContainer.classList.add('visible'); 
        
        // KONFETI DIHAPUS DARI SINI

    }, 1000); 
}

function blowOut(candleElement) {
    if (candleElement.dataset.lit === 'true') {
        candleElement.dataset.lit = 'false';
        const flame = candleElement.querySelector('.flame');
        if (flame) {
            flame.style.opacity = '0';
        }
        
        blownOutCount++;
        checkAllBlownOut();
    }
}

function checkAllBlownOut() {
    const congratsMessage = document.getElementById('congrats-message');

    if (blownOutCount === totalCandles) {
        congratsMessage.innerText = 'SELAMAT ULANG TAHUN, VINN! 🥳🎉';
        
        // PERBAIKAN: Lilin JANGAN menghilang
        // if (candleSet) { candleSet.style.opacity = '0'; } <-- BARIS INI DIHAPUS

        // PICU KONFETI HANYA SEKALI
        generateConfetti(); 

    } else {
        congratsMessage.innerText = `Masih ada ${totalCandles - blownOutCount} lilin lagi!`;
    }
}
