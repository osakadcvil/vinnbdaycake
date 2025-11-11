document.addEventListener('DOMContentLoaded', () => {
    // --- Elemen DOM ---
    const musicBox = document.getElementById('musicBox');
    const goldenKey = document.getElementById('goldenKey');
    const rotatingFigure = document.getElementById('rotatingFigure');
    const closeBoxButton = document.getElementById('closeBox');

    // --- Sound Files (Harap Ganti Path Ini) ---
    // Pastikan Anda telah mengunggah file-file ini
    const SOUND_KEY_WIND = 'key_wind.mp3'; // Suara kunci diputar (Winding/Click)
    const MUSIC_MELODY = 'music_box_melody.mp3'; // Melodi Kotak Musik
    
    let isBoxOpen = false;
    let audioMelody;

    // --- Fungsi Bantuan Audio ---
    function playSound(filePath, volume = 0.8) {
        if (filePath) {
            const audio = new Audio(filePath);
            audio.volume = volume;
            audio.play().catch(e => console.warn(Audio playback blocked: ${filePath}, e));
        }
    }

    function startMusic() {
        if (!audioMelody) {
            audioMelody = new Audio(MUSIC_MELODY);
            audioMelody.loop = true;
            audioMelody.volume = 0.6;
        }
        audioMelody.play().catch(e => console.error("Gagal memutar melodi:", e));
    }

    function stopMusic() {
        if (audioMelody) {
            audioMelody.pause();
            audioMelody.currentTime = 0;
        }
    }

    // ==========================================================
    // 1. INTERAKSI: KLIK KUNCI EMAS
    // ==========================================================
    goldenKey.addEventListener('click', () => {
        if (isBoxOpen) return; // Mencegah klik ganda

        isBoxOpen = true;
        
        // 1. Mainkan Suara Kunci Diputar
        playSound(SOUND_KEY_WIND, 0.9);

        // 2. Animasikan Tutup Kotak Terbuka
        musicBox.classList.add('open');
        
        // 3. Setelah Tutup Terbuka (sekitar 1.5 detik), mulai kejutan interior
        setTimeout(() => {
            // Patung mulai berputar
            rotatingFigure.classList.add('spin'); 
            
            // Musik dimulai
            startMusic(); 
            
            // Opsional: Tembak Confetti Halus
            playSubtleConfetti();

        }, 1500); // Sesuaikan dengan durasi transisi CSS tutup kotak
    });


    // ==========================================================
    // 2. INTERAKSI: TUTUP KOTAK MUSIK
    // ==========================================================
    closeBoxButton.addEventListener('click', () => {
        if (!isBoxOpen) return;

        isBoxOpen = false;
        
        // Hentikan Patung dan Musik
        rotatingFigure.classList.remove('spin');
        stopMusic();
        
        // Tutup Kotak
        musicBox.classList.remove('open');
    });

    // --- Fungsi Confetti Halus (Seperti Stardust) ---
    function playSubtleConfetti() {
        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 80,
                spread: 90,
                ticks: 100,
                gravity: 0.3,
                scalar: 0.7,
                origin: { x: 0.5, y: 0.5 }, // Dari tengah kotak
                // Warna Emas dan Perak
                colors: ['#DAA520', '#C0C0C0', '#F5F5DC'] 
            });
        }
    }
});
