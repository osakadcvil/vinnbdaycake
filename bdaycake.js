// Data warna konfeti
const confettiColors = ['#ff4e50', '#fc913a', '#f9d62e', '#a8e063', '#4bc0c8', '#8e2de2']; 
let candlesLit = 5; 
let giftBoxOpened = false; 

// Dapatkan referensi elemen DOM di awal
const giftBox = document.getElementById('giftBox');
const cakeContainer = document.getElementById('cakeContainer');
const messageContainer = document.querySelector('.message-container');
const congratsMessage = document.getElementById('congrats-message'); 
const confettiContainer = document.getElementById('confetti-container');


// FUNGSI UTAMA UNTUK MEMBUKA KOTAK (Dipanggil oleh onclick pada giftBox)
function openGift() {
    if (giftBoxOpened) return; 

    giftBox.classList.add('open'); 
    giftBoxOpened = true;

    // Sembunyikan instruksi klik secara eksplisit
    const clickInstruction = document.querySelector('.click-instruction');
    if (clickInstruction) {
        clickInstruction.style.opacity = 0; 
    }

    // Tunda untuk sinkron dengan animasi tutup kotak (0.5s di CSS)
    setTimeout(() => {
        giftBox.style.display = 'none'; 
        
        cakeContainer.classList.remove('hidden'); 
        
        // Pemicu animasi kue (opacity dan transform)
        setTimeout(() => {
            cakeContainer.classList.add('visible'); 

            // Tampilkan pesan awal (instruksi meniup lilin)
            congratsMessage.textContent = `Tiup kelima lilinnya! Sisa: ${candlesLit} 🌬️`;
            messageContainer.style.opacity = 1;
            messageContainer.style.pointerEvents = 'auto'; 
        }, 50); 
        
    }, 500); 
}


// FUNGSI UNTUK MEMADAMKAN LILIN (Dipanggil oleh onclick pada flame)
// Menerima elemen CANDLE (induk dari FLAME)
function blowOut(candleElement) {
    // Cek apakah lilin sudah padam
    if (candleElement.getAttribute('data-lit') === 'false') {
        return;
    }
    
    // Pastikan kotak sudah terbuka
    if (!giftBoxOpened) {
        congratsMessage.textContent = "Buka kotak kadonya dulu ya! 🎁";
        messageContainer.style.opacity = 1;
        messageContainer.classList.remove('float-up');
        return;
    }

    const flameElement = candleElement.querySelector('.flame');

    flameElement.classList.add('out');
    candleElement.setAttribute('data-lit', 'false'); 
    candlesLit--;

    // Perbarui pesan status lilin
    congratsMessage.textContent = `Sisa lilin: ${candlesLit} 🌬️`;

    if (candlesLit === 0) {
        triggerCelebration();
    }
}

// FUNGSI UNTUK MEMULAI PERAYAAN
function triggerCelebration() {
    
    setTimeout(() => {
        // Pesan Akhir
        congratsMessage.textContent = "SELAMAT ULANG TAHUN ADEKKK! 🎂🥳🎉";

        // Animasi pesan ke atas
        messageContainer.classList.remove('float-up'); 
        messageContainer.classList.add('float-up');
        messageContainer.style.opacity = 1;
        messageContainer.style.pointerEvents = 'none'; 

        // Mulai Konfeti
        confettiContainer.style.display = 'block';
        createConfetti(100);

        // Hentikan konfeti setelah 5 detik
        setTimeout(() => {
            confettiContainer.style.display = 'none';
        }, 5000);
        
    }, 500); 
}

// FUNGSI UNTUK MEMBUAT KONFETI
function createConfetti(count) {
    // Hapus konfeti lama
    confettiContainer.innerHTML = ''; 

    for (let i = 0; i < count; i++) {
        const confetto = document.createElement('div');
        confetto.classList.add('confetto');
        
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetto.style.backgroundColor = color;
        
        // Posisi awal acak
        confetto.style.left = Math.random() * 100 + 'vw';
        confetto.style.top = Math.random() * -50 + 'px'; // Mulai dari atas, tersembunyi
        
        const duration = Math.random() * 3 + 2; 
        const delay = Math.random() * 0.5; 
        
        // Gunakan keyframe 'fall' dari CSS
        confetto.style.animation = `fall ${duration}s linear ${delay}s forwards`;
        
        confettiContainer.appendChild(confetto);
    }
}
