// --- bdaycake.js (KODE BERSIH DAN FINAL) ---

const totalCandles = 5;
let blownOutCount = 0;
const confettiContainer = document.getElementById('confetti-container');
const congratsMessage = document.getElementById('congrats-message');
const giftBox = document.getElementById('giftBox');
const cakeContainer = document.getElementById('cakeContainer');

// Palet warna untuk konfeti
const confettiColors = [
    '#ff6f69', '#ffcc5c', '#88d8b0', '#6b5b95', '#e0b7ff', '#f7a399'
];

// FUNGSI 1: Menghasilkan Konfeti (Versi Normal & INSTAN)
function generateConfetti() {
    const confettiCount = 100; // Jumlah konfeti yang dianggap Normal
    
    for (let i = 0; i < confettiCount; i++) {
        const confetto = document.createElement('div');
        confetto.classList.add('confetto');
        
        const randomColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetto.style.backgroundColor = randomColor;
        
        confetto.style.left = Math.random() * 100 + 'vw'; 
        
        // Durasi jatuh acak (4s hingga 6s)
        const fallDuration = (Math.random() * 2) + 4; 
        const wobbleDuration = (Math.random() * 0.5) + 2; 
        
        // Konfeti harus jatuh INSTAN, jadi tidak ada delay acak di sini.
        
        // Menerapkan kedua animasi (Jatuh dan Goyang) ke elemen
        confetto.style.animation = `
            confetti-wobble ${wobbleDuration}s ease-in-out infinite alternate, 
            confetti-fall-normal ${fallDuration}s linear forwards
        `;
        
        confettiContainer.appendChild(confetto);

        // Hapus elemen setelah animasi jatuh selesai
        setTimeout(() => {
            confetto.remove();
        }, (fallDuration * 1000)); // Hanya berdasarkan durasi jatuh
    }
}


// FUNGSI 2: Membuka Kado dan Memunculkan Kue
function openGift() {
    if (giftBox.classList.contains('open')) {
        return; 
    }

    // 1. Kado terbuka
    giftBox.classList.add('open');
    // Revisi Teks: Mengganti "Tiup" menjadi "Klik"
    congratsMessage.innerText = 'Lihat Kuemu! Sekarang Klik Lilinnya 🖱️';

    setTimeout(() => {
        // 2. Kado menghilang
        giftBox.style.opacity = '0';
        giftBox.style.pointerEvents = 'none';

        // 3. KUE MUNCUL
        cakeContainer.classList.remove('hidden');
        cakeContainer.classList.add('visible'); 

    }, 500); 
}


// FUNGSI 3: Meniup Lilin (Klik Lilin)
function blowOut(candleElement) {
    if (candleElement.dataset.lit === 'true') {
        candleElement.dataset.lit = 'false';
        const flame = candleElement.querySelector('.flame');
        
        if (flame) {
            flame.classList.add('out'); // Api padam (lilin tetap ada)
        }
        
        blownOutCount++;
        checkAllBlownOut();
    }
}


// FUNGSI 4: Cek Semua Lilin Sudah Mati
let confettiTriggered = false; 
function checkAllBlownOut() {
    if (blownOutCount === totalCandles) {
        congratsMessage.innerText = 'SELAMAT ULANG TAHUN, VINN! 🥳🎉';
        
        // PICU KONFETI INSTAN (Tanpa delay)
        if (!confettiTriggered) {
            generateConfetti(); 
            confettiTriggered = true;
        }

    } else {
        congratsMessage.innerText = `Masih ada ${totalCandles - blownOutCount} lilin lagi!`;
    }
}
