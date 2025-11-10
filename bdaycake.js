
document.addEventListener('DOMContentLoaded', () => {
    const starCandles = document.querySelectorAll('.star-candle');
    const cakeContainer = document.getElementById('constellationCake');
    const constellationMessage = document.getElementById('constellationMessage');
    
    // Urutan klik yang benar (sesuai data-order di HTML)
    // Urutan ini membentuk rasi bintang Sagitarius
    const correctSequence = ['1', '2', '3', '4', '5', '6', '7'];
    
    let currentSequence = [];
    let lastClickedStar = null;
    let clickCount = 0;

    // Mendapatkan posisi absolut elemen (relatif terhadap wadah kue)
    function getStarPosition(starElement) {
        const rect = starElement.getBoundingClientRect();
        const containerRect = cakeContainer.getBoundingClientRect();
        return {
            x: rect.left + (rect.width / 2) - containerRect.left,
            y: rect.top + (rect.height / 2) - containerRect.top
        };
    }

    // Fungsi untuk menghitung jarak dan sudut, lalu menggambar garis
    function drawConstellationLine(startStar, endStar) {
        const pos1 = getStarPosition(startStar);
        const pos2 = getStarPosition(endStar);

        // 1. Hitung Jarak (Panjang Garis) menggunakan Teorema Pythagoras
        const distance = Math.sqrt(
            Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2)
        );

        // 2. Hitung Sudut Kemiringan (Arc Tangent)
        const angle = Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x); // Hasil dalam radian

        // 3. Buat dan Gaya Elemen Garis
        const line = document.createElement('div');
        line.classList.add('constellation-line');
        line.style.width = distance + 'px';
        line.style.top = pos1.y + 'px';
        line.style.left = pos1.x + 'px';
        line.style.transform = `rotate(${angle}rad)`; // Terapkan rotasi
        
        cakeContainer.appendChild(line); // Tambahkan garis ke wadah kue
    }

    // Fungsi Reset Puzzle
    function resetConstellation(alertUser = true) {
        if (alertUser) {
            alert("Rasi Bintang hilang! Urutan salah atau Anda mengklik bintang yang sudah diaktifkan. Coba lagi!");
        }
        currentSequence = [];
        lastClickedStar = null;
        clickCount = 0;
        
        // Hapus semua bintang yang sudah diklik dan garis
        starCandles.forEach(star => {
            star.classList.remove('clicked');
        });
        document.querySelectorAll('.constellation-line').forEach(line => line.remove());
    }

    // --- Event Listener untuk Bintang ---
    starCandles.forEach(star => {
        star.addEventListener('click', function() {
            const starOrder = this.getAttribute('data-order');
            
            // Cek apakah bintang ini sudah diklik
            if (this.classList.contains('clicked')) return; 

            // 1. Validasi Urutan Klik
            const expectedOrder = correctSequence[clickCount];
            
            if (starOrder === expectedOrder) {
                // Klik BENAR
                this.classList.add('clicked');
                
                if (lastClickedStar) {
                    drawConstellationLine(lastClickedStar, this);
                }
                
                lastClickedStar = this; // Simpan bintang saat ini
                clickCount++;
                
                // 2. Cek Apakah Rasi Bintang Selesai
                if (clickCount === correctSequence.length) {
                    revealConstellationMessage();
                }

            } else {
                // Klik SALAH
                resetConstellation();
            }
        });
    });

    // Fungsi Hadiah Akhir
    function revealConstellationMessage() {
        // Tampilkan pesan dengan glow
        setTimeout(() => {
            constellationMessage.classList.add('show-glow');
        }, 500); 
        
        // Tembakkan Confetti Kosmik
        playCosmicConfetti();
    }
    
    // Fungsi Confetti yang Bertema Galaksi
    function playCosmicConfetti() {
        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 200,
                spread: 180,
                ticks: 200,
                gravity: 0.5,
                scalar: 1,
                // Warna Kosmik: Ungu Tua, Emas, Perak
                colors: ['#4b0082', '#DAA520', '#C0C0C0'],
                origin: { y: 0.6 } // Dari area kue
            });
        }
    }
});
