// Data warna konfeti
const confettiColors = ['#ff4e50', '#fc913a', '#f9d62e', '#a8e063', '#4bc0c8', '#8e2de2']; 
let candlesLit = 5; // Mulai dengan 5 lilin
let giftBoxOpened = false; 

// Dapatkan referensi elemen DOM di awal
const giftBox = document.getElementById('giftBox');
const cakeContainer = document.getElementById('cakeContainer');
const messageContainer = document.querySelector('.message-container');
const congratsMessage = document.getElementById('congrats-message'); // Asumsikan ini adalah H1 di dalam message-container
const confettiContainer = document.getElementById('confetti-container');


// FUNGSI UTAMA UNTUK MEMBUKA KOTAK (sekarang dipanggil dari div.gift-box)
function openGift() {
    if (giftBoxOpened) return; 

    giftBox.classList.add('open'); // Memicu animasi CSS kotak terbuka
    giftBoxOpened = true;

    // Sembunyikan instruksi klik
    const clickInstruction = document.querySelector('.click-instruction');
    if (clickInstruction) {
        clickInstruction.style.opacity = 0;
    }

    // Tampilkan kue dan pesan setelah animasi tutup kotak selesai
    setTimeout(() => {
        giftBox.style.display = 'none'; // Sembunyikan kotak sepenuhnya
        
        cakeContainer.classList.remove('hidden'); 
        
        // Tambahkan kelas 'visible' untuk memicu animasi fade-in dan float-up
        setTimeout(() => {
            cakeContainer.classList.add('visible'); 

            // Tampilkan pesan awal (instruksi meniup lilin)
            congratsMessage.textContent = `Tiup kelima lilinnya! Sisa: ${candlesLit} 🌬️`;
            messageContainer.style.opacity = 1;
            messageContainer.style.pointerEvents = 'auto'; // Agar bisa dilihat
        }, 50); 
        
    }, 500); 
}


// FUNGSI UNTUK MEMADAMKAN LILIN
// CATATAN PENTING: Fungsi ini HARUS menerima elemen CANDLE, bukan FLAME, 
// agar kita bisa memperbarui data-lit pada elemen induk yang benar.
// Anda perlu memastikan HTML Anda memanggil: onclick="blowOut(this.parentNode)"
function blowOut(candleElement) {
    // Cek apakah lilin sudah padam
    if (candleElement.getAttribute('data-lit') === 'false') {
        return;
    }
    
    // Pastikan kotak sudah terbuka sebelum bisa memadamkan lilin
    if (!giftBoxOpened) {
        // Ganti alert yang mengganggu dengan pembaruan pesan di layar
        congratsMessage.textContent = "Buka kotak kadonya dulu ya! 🎁";
        messageContainer.style.opacity = 1;
        messageContainer.classList.remove('float-up');
        return;
    }

    const flameElement = candleElement.querySelector('.flame');

    flameElement.classList.add('out');
    candleElement.setAttribute('data-lit', 'false'); // Set pada elemen candle
    candlesLit--;

    // Perbarui pesan status lilin
    congratsMessage.textContent = `Sisa lilin: ${candlesLit} 🌬️`;

    if (candlesLit === 0) {
        triggerCelebration();
    }
}

// FUNGSI UNTUK MEMULAI PERAYAAN
function triggerCelebration() {
    
    // Tunggu sebentar setelah lilin terakhir padam
    setTimeout(() => {
        // Ubah pesan menjadi ucapan selamat ulang tahun penuh
        congratsMessage.textContent = "SELAMAT ULANG TAHUN ADEKKK! 🎂🥳🎉";

        // Tampilkan pesan ucapan dengan animasi float-up
        messageContainer.classList.remove('float-up'); // Reset jika sebelumnya ada pesan peringatan
        messageContainer.classList.add('float-up');
        messageContainer.style.opacity = 1;
        messageContainer.style.pointerEvents = 'none'; // Agar user bisa melihat tanpa perlu berinteraksi

        // Mulai Konfeti
        confettiContainer.style.display = 'block';
        createConfetti(100);

        // Hentikan konfeti setelah 5 detik
        setTimeout(() => {
            confettiContainer.style.display = 'none';
            // Hapus keyframes dinamis untuk membersihkan memori
            const styleSheet = document.getElementById('confetti-keyframes');
            if (styleSheet) {
                 styleSheet.remove();
            }
        }, 5000);
        
    }, 500); // Penundaan kecil agar lilin terakhir terlihat padam
}

// FUNGSI UNTUK MEMBUAT KONFETI
function createConfetti(count) {
    // Hapus keyframes lama jika ada
    let styleSheet = document.getElementById('confetti-keyframes');
    if (styleSheet) {
        styleSheet.remove();
    }

    // Keyframes untuk animasi jatuh (dibuat dinamis agar tidak perlu edit CSS)
    styleSheet = document.createElement("style");
    styleSheet.id = 'confetti-keyframes';
    styleSheet.innerHTML = `
        @keyframes fall {
            from { opacity: 0.8; }
            to {
                transform: translate3d(0, 100vh, 0) rotate(720deg);
                opacity: 0.5;
            }
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Hapus konfeti lama
    confettiContainer.innerHTML = ''; 

    for (let i = 0; i < count; i++) {
        const confetto = document.createElement('div');
        confetto.classList.add('confetto');
        
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetto.style.backgroundColor = color;
        
        confetto.style.left = Math.random() * 100 + 'vw';
        confetto.style.top = Math.random() * -50 + 'px'; // Mulai lebih tinggi
        
        const duration = Math.random() * 3 + 2; // 2-5 detik
        const delay = Math.random() * 0.5; // 0-0.5 detik
        
        confetto.style.animation = `fall ${duration}s ${delay}s forwards`;
        // Gunakan timing function yang lebih bervariasi
        confetto.style.animationTimingFunction = 'ease-in'; 
        
        confettiContainer.appendChild(confetto);
    }
}

// Pastikan fungsi openGift diakses di HTML: <div class="gift-box" onclick="openGift()">
// Pastikan fungsi blowOut diakses di HTML: <div class="flame" onclick="blowOut(this.parentNode)">
