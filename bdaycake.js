// --- bdaycake.js (KODE LENGKAP) ---

const totalCandles = 5;
let blownOutCount = 0;
const confettiContainer = document.getElementById('confetti-container');
// Ambil elemen candle-set di awal
const candleSet = document.querySelector('.candle-set'); 

// Palet warna cerah dan beragam untuk konfeti
const confettiColors = [
    '#ff6f69', // Coral
    '#ffcc5c', // Yellow
    '#88d8b0', // Mint Green
    '#6b5b95', // Purple
    '#e0b7ff', // Light Purple
    '#f7a399'  // Light Red
];

// FUNGSI UTAMA UNTUK MENGHASILKAN KONFETI (DITINGKATKAN)
function generateConfetti() {
    const confettiCount = 200; // Jumlah konfeti per ledakan DITINGKATKAN
    // Variasi animasi jatuh (memerlukan CSS yang diperbarui)
    const fallAnimations = ['confetti-fall-normal', 'confetti-fall-slow', 'confetti-fall-fast']; 
    const shapes = ['', 'small', 'large', 'circle'];

    for (let i = 0; i < confettiCount; i++) {
        const confetto = document.createElement('div');
        confetto.classList.add('confetto');
        
        // Pilih warna, animasi, dan bentuk secara acak
        const randomColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        const randomAnimation = fallAnimations[Math.floor(Math.random() * fallAnimations.length)];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        
        if (randomShape) {
            confetto.classList.add(randomShape);
        }

        confetto.style.backgroundColor = randomColor;
        // Posisi awal acak di atas layar
        confetto.style.left = Math.random() * 100 + 'vw'; 
        confetto.style.animationName = randomAnimation;
        
        // Durasi yang lebih panjang dan variatif (4s - 10s)
        const duration = (Math.random() * 6) + 4; 
        confetto.style.animationDuration = duration + 's';
        
        // Penundaan agar konfeti ditembakkan berurutan
        confetto.style.animationDelay = (Math.random() * 0.5) + 's'; 

        confettiContainer.appendChild(confetto);

        // Hapus konfeti setelah animasinya selesai
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

    giftBox.classList.add('open');
    congratsMessage.innerText = 'Lihat Kuemu! Sekarang Tiup Lilinnya 🌬️';

    setTimeout(() => {
        cakeContainer.classList.remove('hidden');
        
        // PICU KONFETI BERTURUT-TURUT (3 kali)
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
        
        // PERBAIKAN: Hanya sembunyikan wadah lilin, BUKAN seluruh kue
        if (candleSet) {
            candleSet.style.opacity = '0'; 
            candleSet.style.transition = 'opacity 1s ease-out';
        }

        // PICU KONFETI BERKALI-KALI (5 kali)
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
