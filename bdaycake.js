// --- bdaycake.js (KODE BERSIH DAN FINAL) ---

const totalCandles = 5;
let blownOutCount = 0;
const confettiContainer = document.getElementById('confetti-container');
const congratsMessage = document.getElementById('congrats-message');
const giftBox = document.getElementById('giftBox');
const cakeContainer = document.getElementById('cakeContainer');

const confettiColors = [
    '#ff6f69', '#ffcc5c', '#88d8b0', '#6b5b95', '#e0b7ff', '#f7a399'
];

// FUNGSI 1: Menghasilkan Konfeti (Versi Normal)
function generateConfetti() {
    const confettiCount = 100; // Jumlah konfeti yang Normal
    
    for (let i = 0; i < confettiCount; i++) {
        const confetto = document.createElement('div');
        confetto.classList.add('confetto');
        
        const randomColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetto.style.backgroundColor = randomColor;
        
        // Posisi horizontal acak di seluruh layar
        confetto.style.left = Math.random() * 100 + 'vw'; 
        
        // Durasi jatuh acak (4s hingga 6s)
        const fallDuration = (Math.random() * 2) + 4; 
        
        // Penundaan agar konfeti tidak jatuh serentak
        const delay = (Math.random() * 0.5); 

        // PERBAIKAN: Menerapkan kedua animasi (Jatuh dan Goyang) di JS
        confetto.style.animation = `
            confetti-wobble 2s ease-in-out infinite alternate, 
            confetti-fall-normal ${fallDuration}s linear forwards
        `;
        
        confetto.style.animationDelay = `${delay}s`; 

        confettiContainer.appendChild(confetto);

        // Hapus elemen setelah animasi jatuh selesai
        setTimeout(() => {
            confetto.remove();
        }, (fallDuration * 1000) + (delay * 1000));
    }
}


// FUNGSI 2: Membuka Kado dan Memunculkan Kue
function openGift() {
    if (giftBox.classList.contains('open')) {
        return; // Mencegah klik berulang
    }

    // 1. Kado terbuka
    giftBox.classList.add('open');
    congratsMessage.innerText = 'Lihat Kuemu! Sekarang Tiup Lilinnya 🌬️';

    setTimeout(() => {
        // 2. Kado dan pesan menghilang dengan transisi halus
        giftBox.style.opacity = '0';
        giftBox.style.pointerEvents = 'none';

        // 3. KUE MUNCUL (digerakkan oleh kelas .visible di CSS)
        cakeContainer.classList.remove('hidden');
        cakeContainer.classList.add('visible'); 

    }, 500); // 500ms agar memberi waktu animasi kotak terbuka sedikit
}


// FUNGSI 3: Meniup Lilin
function blowOut(candleElement) {
    if (candleElement.dataset.lit === 'true') {
        candleElement.dataset.lit = 'false';
        const flame = candleElement.querySelector('.flame');
        
        if (flame) {
            flame.classList.add('out'); // Tambahkan kelas 'out' untuk menghilangkan api
        }
        
        blownOutCount++;
        checkAllBlownOut();
    }
}


// FUNGSI 4: Cek Semua Lilin Sudah Mati
let confettiTriggered = false; // Flag untuk memastikan konfeti hanya muncul sekali
function checkAllBlownOut() {
    if (blownOutCount === totalCandles) {
        congratsMessage.innerText = 'SELAMAT ULANG TAHUN, VINN! 🥳🎉';
        
        // KONFETI HANYA MUNCUL SEKALI
        if (!confettiTriggered) {
            generateConfetti(); 
            confettiTriggered = true;
        }
        
        // LILIN TETAP TERLIHAT (Tidak ada kode untuk menyembunyikan candleSet)

    } else {
        congratsMessage.innerText = `Masih ada ${totalCandles - blownOutCount} lilin lagi!`;
    }
}
