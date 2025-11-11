// Data warna konfeti
const confettiColors = ['#ff4e50', '#fc913a', '#f9d62e', '#a8e063', '#4bc0c8', '#8e2de2']; 
let candlesLit = 5; 
let giftBoxOpened = false; 

// Dapatkan referensi elemen DOM di awal
const giftBox = document.getElementById('giftBox');
const cakeContainer = document.getElementById('cakeContainer');
const messageContainer = document.getElementById('messageContainer'); // Menggunakan ID yang lebih spesifik
const congratsMessage = document.getElementById('congrats-message'); 
const confettiContainer = document.getElementById('confetti-container');


// FUNGSI UTAMA UNTUK MEMBUKA KOTAK
function openGift() {
    if (giftBoxOpened) return; 

    giftBox.classList.add('open'); 
    giftBoxOpened = true;

    const clickInstruction = document.querySelector('.click-instruction');
    if (clickInstruction) {
        clickInstruction.style.opacity = 0; 
    }

    setTimeout(() => {
        giftBox.style.display = 'none'; 
        
        cakeContainer.classList.remove('hidden'); 
        
        setTimeout(() => {
            cakeContainer.classList.add('visible'); 

            // REVISI: Ganti teks instruksi menjadi "Klik kelima lilinnya!"
            congratsMessage.textContent = `Klik kelima lilinnya! Sisa: ${candlesLit} 🕯️`;
            messageContainer.style.opacity = 1;
            messageContainer.style.pointerEvents = 'auto'; 
        }, 50); 
        
    }, 500); 
}


// FUNGSI KLIK LILIN (Nama fungsi tetap blowOut karena sudah terlanjur dipanggil di HTML)
function blowOut(candleElement) {
    if (candleElement.getAttribute('data-lit') === 'false') {
        return;
    }
    
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
    congratsMessage.textContent = `Sisa lilin: ${candlesLit} 🕯️`; // Menggunakan lilin di sini
    
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
        
        confetto.style.left = Math.random() * 100 + 'vw';
        confetto.style.top = Math.random() * -50 + 'px'; 
        
        const duration = Math.random() * 3 + 2; 
        const delay = Math.random() * 0.5; 
        
        confetto.style.animation = `fall ${duration}s linear ${delay}s forwards`;
        
        confettiContainer.appendChild(confetto);
    }
}
