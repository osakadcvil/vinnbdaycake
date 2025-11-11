// Data warna konfeti
const confettiColors = ['#ff4e50', '#fc913a', '#f9d62e', '#a8e063', '#4bc0c8', '#8e2de2']; 
let candlesLit = 5; 
let giftBoxOpened = false; 

// Dapatkan referensi elemen DOM
const giftBox = document.getElementById('giftBox');
const cakeContainer = document.getElementById('cakeContainer');
const messageContainer = document.getElementById('messageContainer'); 
const congratsMessage = document.getElementById('congrats-message'); 
const confettiContainer = document.getElementById('confetti-container');
const cakeSlice = document.getElementById('cakeSlice'); // PENTING: Referensi ke slice

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

            congratsMessage.textContent = `Klik kelima lilinnya! Sisa: ${candlesLit} 🕯️`;
            messageContainer.style.opacity = 1;
            messageContainer.style.pointerEvents = 'auto'; 
        }, 50); 
        
    }, 500); 
}


// FUNGSI KLIK LILIN
function blowOut(candleElement) {
    if (candleElement.getAttribute('data-lit') === 'false' || !giftBoxOpened) {
        if (!giftBoxOpened) {
            congratsMessage.textContent = "Buka kotak kadonya dulu ya! 🎁";
            messageContainer.style.opacity = 1;
            messageContainer.classList.remove('float-up');
        }
        return;
    }

    const flameElement = candleElement.querySelector('.flame');

    flameElement.classList.add('out');
    candleElement.setAttribute('data-lit', 'false'); 
    candlesLit--;

    congratsMessage.textContent = `Sisa lilin: ${candlesLit} 🕯️`;
    
    if (candlesLit === 0) {
        triggerCelebration();
    }
}

// FUNGSI UNTUK MEMOTONG KUE
function cutTheCake() {
    // 1. Tampilkan potongan kue (hilangkan 'hidden')
    cakeSlice.classList.remove('hidden');
    
    // 2. Pemicu animasi (tambahkan 'cut')
    setTimeout(() => {
        cakeSlice.classList.add('cut');
    }, 100);
}


// FUNGSI UNTUK MEMULAI PERAYAAN
function triggerCelebration() {
    
    setTimeout(() => {
        // PENTING: Potongan kue dipanggil di sini
        cutTheCake(); 

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
