// --- KODE JAVASCRIPT LENGKAP bdaycake.js ---

const totalCandles = 5;
let blownOutCount = 0;
const confettiContainer = document.getElementById('confetti-container');

// Palet warna yang lebih cerah dan beragam
const confettiColors = [
    '#ff6f69', // Coral
    '#ffcc5c', // Yellow
    '#88d8b0', // Mint Green
    '#6b5b95', // Purple
    '#e0b7ff', // Light Purple
    '#f7a399'  // Light Red
];

// --- FUNGSI UTAMA UNTUK MENGHASILKAN KONFETI ---
function generateConfetti() {
    const confettiCount = 200; // Ditingkatkan dari jumlah sebelumnya
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
    const messageContainer = document.getElementById('messageContainer');

    if (giftBox.classList.contains('open')) {
        return; // Mencegah klik berulang
    }

    giftBox.classList.add('open');
    messageContainer.innerHTML = '<h1>Lihat Kuemu! Sekarang Tiup Lilinnya 🌬️</h1>';

    // Tunda untuk efek animasi kotak terbuka
    setTimeout(() => {
        cakeContainer.classList.remove('hidden');
        
        // PICU KONFETI BERTURUT-TURUT SAAT KOTAK DIBUKA
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
    if (blownOutCount === totalCandles) {
        document.getElementById('congrats-message').innerText = 'SELAMAT ULANG TAHUN, VINN! 🥳🎉';
        
        // PICU KONFETI BERKALI-KALI SAAT SEMUA LILIN PADAM
        let burstCount = 0;
        const burstInterval = setInterval(() => {
            generateConfetti();
            burstCount++;
            if (burstCount >= 5) { // 5 kali tembakan konfeti
                clearInterval(burstInterval);
            }
        }, 300); // Setiap 300ms

        // Opsional: Sembunyikan lilin yang sudah padam (tergantung pada CSS Anda)
        document.querySelector('.candle-set').style.opacity = '0';
    } else {
        document.getElementById('congrats-message').innerText = `Masih ada ${totalCandles - blownOutCount} lilin lagi!`;
    }
}
