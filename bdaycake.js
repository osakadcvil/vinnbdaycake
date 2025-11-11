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


// FUNGSI UTAMA UNTUK MEMBUKA KOTAK (sekarang dipanggil dari div.gift-box)
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

            congratsMessage.textContent = `Tiup kelima lilinnya! Sisa: ${candlesLit} 🌬️`;
            messageContainer.style.opacity = 1;
            messageContainer.style.pointerEvents = 'auto'; 
        }, 50); 
        
    }, 500); 
}


// FUNGSI UNTUK MEMADAMKAN LILIN
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

    congratsMessage.textContent = `Sisa lilin: ${candlesLit} 🌬️`;

    if (candlesLit === 0) {
        triggerCelebration();
    }
}

// FUNGSI UNTUK MEMULAI PERAYAAN
function triggerCelebration() {
    
    setTimeout(() => {
        congratsMessage.textContent = "SELAMAT ULANG TAHUN ADEKKK! 🎂🥳🎉";

        messageContainer.classList.remove('float-up'); 
        messageContainer.classList.add('float-up');
        messageContainer.style.opacity = 1;
        messageContainer.style.pointerEvents = 'none'; 

        confettiContainer.style.display = 'block';
        createConfetti(100);

        setTimeout(() => {
            confettiContainer.style.display = 'none';
            const styleSheet = document.getElementById('confetti-keyframes');
            if (styleSheet) {
                 styleSheet.remove();
            }
        }, 5000);
        
    }, 500); 
}

// FUNGSI UNTUK MEMBUAT KONFETI
function createConfetti(count) {
    let styleSheet = document.getElementById('confetti-keyframes');
    if (styleSheet) {
        styleSheet.remove();
    }

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
        
        confetto.style.animation = `fall ${duration}s ${delay}s forwards`;
        confetto.style.animationTimingFunction = 'ease-in'; 
        
        confettiContainer.appendChild(confetto);
    }
}
