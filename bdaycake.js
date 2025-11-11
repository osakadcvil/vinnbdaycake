// --- bdaycake.js (KODE LENGKAP) ---

const totalCandles = 5;
let blownOutCount = 0;
const confettiContainer = document.getElementById('confetti-container');
const candleSet = document.querySelector('.candle-set'); 

const confettiColors = [
    '#ff6f69', '#ffcc5c', '#88d8b0', '#6b5b95', '#e0b7ff', '#f7a399'
];

// FUNGSI KONFETI (DITINGKATKAN)
function generateConfetti() {
    const confettiCount = 200; 
    const fallAnimations = ['confetti-fall-normal', 'confetti-fall-slow', 'confetti-fall-fast']; 
    const shapes = ['', 'small', 'large', 'circle'];

    for (let i = 0; i < confettiCount; i++) {
        const confetto = document.createElement('div');
        confetto.classList.add('confetto');
        
        const randomColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        const randomAnimation = fallAnimations[Math.floor(Math.random() * fallAnimations.length)];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        
        if (randomShape) {
            confetto.classList.add(randomShape);
        }

        confetto.style.backgroundColor = randomColor;
        confetto.style.left = Math.random() * 100 + 'vw'; 
        confetto.style.animationName = randomAnimation;
        
        const duration = (Math.random() * 6) + 4; 
        confetto.style.animationDuration = duration + 's';
        
        confetto.style.animationDelay = (Math.random() * 0.5) + 's'; 

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
    congratsMessage.innerText = 'Lihat Kuemu! Sekarang Tiup Lilinnya 🌬️';

    setTimeout(() => {
        // 2. Kado dan pesan menghilang, kue muncul
        giftBox.style.opacity = '0';
        giftBox.style.pointerEvents = 'none';
        
        // KUNCI PERBAIKAN KUE MUNCUL: Hapus 'hidden' dan tambahkan 'visible'
        cakeContainer.classList.remove('hidden');
        cakeContainer.classList.add('visible'); 
        
        // PICU KONFETI BERTURUT-TURUT
        generateConfetti();
        setTimeout(generateConfetti, 100);
        setTimeout(generateConfetti, 200);

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
        
        // Lilin menghilang, kue tetap ada
        if (candleSet) {
            candleSet.style.opacity = '0'; 
        }

        // PICU KONFETI BERKALI-KALI
        let burstCount = 0;
        const burstInterval = setInterval(() => {
            generateConfetti();
            burstCount++;
            if (burstCount >= 5) {
                clearInterval(burstInterval);
            }
        }, 300); 

    } else {
        congratsMessage.innerText = `Masih ada ${totalCandles - blownOutCount} lilin lagi!`;
    }
}

