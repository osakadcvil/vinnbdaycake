// --- bdaycake.js (KODE BERSIH DAN FINAL) ---

const totalCandles = 5;
let blownOutCount = 0;
const confettiContainer = document.getElementById('confetti-container');
const congratsMessage = document.getElementById('congrats-message');
const giftBox = document.getElementById('giftBox');
const cakeContainer = document.getElementById('cakeContainer');

// Palet warna untuk konfeti dan balon
const confettiColors = [
    '#ff6f69', '#ffcc5c', '#88d8b0', '#6b5b95', '#e0b7ff', '#f7a399'
];

// FUNGSI 1: Menghasilkan Konfeti dan Balon (Efek Semburan/Burst)
function generateConfetti() {
    const confettiCount = 100;
    const balloonCount = 20;

    // Buat array yang berisi jenis item yang akan dibuat
    const itemsToGenerate = [
        ...Array(confettiCount).fill('confetti'),
        ...Array(balloonCount).fill('balloon')
    ];
    
    // PERBAIKAN: Tentukan titik asal semburan di layar (30% dari atas) untuk visibilitas instan.
    const originY = window.innerHeight * 0.3; 
    const originX = window.innerWidth / 2;

    itemsToGenerate.forEach(type => {
        const item = document.createElement('div');
        item.classList.add(type === 'confetti' ? 'confetto' : 'balloon');
        
        const randomColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        item.style.backgroundColor = randomColor;

        // Tentukan posisi X akhir secara acak (spread lebar untuk efek semburan)
        const xEnd = (Math.random() * window.innerWidth * 1.5) - (window.innerWidth * 0.75);
        
        // Tentukan rotasi akhir secara acak
        const rotEnd = Math.random() * 720;
        
        // Atur custom properties CSS untuk animasi 'confetti-burst'
        item.style.setProperty('--x-end', `${xEnd}px`);
        item.style.setProperty('--rot-end', `${rotEnd}deg`);

        // Posisi awal (TEPAT di titik ledakan yang terlihat)
        item.style.left = `${originX + (Math.random() * 100 - 50)}px`;
        item.style.top = `${originY}px`; 
        
        // PERBAIKAN: Kurangi durasi total untuk efek yang lebih cepat
        const fallDuration = (Math.random() * 3) + 4; // Durasi total jatuh (4s hingga 7s)
        const wobbleDuration = (Math.random() * 0.5) + 2; 

        // Terapkan animasi semburan baru
        item.style.animation = `
            confetti-wobble ${wobbleDuration}s ease-in-out infinite alternate, 
            confetti-burst ${fallDuration}s linear forwards
        `;
        
        confettiContainer.appendChild(item);

        // Hapus elemen setelah animasi selesai
        setTimeout(() => {
            item.remove();
        }, (fallDuration * 1000) + 100); 
    });
}


// FUNGSI 2: Membuka Kado dan Memunculkan Kue
function openGift() {
    if (giftBox.classList.contains('open')) {
        return; 
    }

    // 1. Kado terbuka
    giftBox.classList.add('open');
    congratsMessage.innerText = 'Lihat Kuemu!🎂 Sekarang Klik Lilinnya!🕯️';

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
        congratsMessage.innerText = 'SELAMAT ULANG TAHUN, VINTUTT🎂🥳🎉';
        
        // PICU SEMBURAN KONFETI & BALON INSTAN
        if (!confettiTriggered) {
            generateConfetti(); 
            confettiTriggered = true;
        }

    } else {
        congratsMessage.innerText = `Masih ada ${totalCandles - blownOutCount} lilin lagi!`;
    }
}
