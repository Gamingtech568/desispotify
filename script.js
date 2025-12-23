document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const startBtn = document.getElementById('startBtn');
    const introContainer = document.querySelector('.intro-container');
    const playerWrapper = document.getElementById('playerWrapper');
    const logo = document.getElementById('logo');
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeIcon = document.getElementById('volumeIcon');
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');
    const trackTitle = document.getElementById('trackTitle');
    const albumName = document.getElementById('albumName');
    const albumArt = document.getElementById('albumArt');
    const playlistEl = document.getElementById('playlist');
    const albumListEl = document.getElementById('albumList');
    const currentAlbumTitle = document.getElementById('currentAlbumTitle');
    const listenerCountEl = document.getElementById('listenerCount');
    const socialListenerCountEl = document.getElementById('socialListenerCount');

    // State
    let isPlaying = false;
    let currentTrackIndex = 0;
    let currentAlbum = 'All'; // Default to show all songs
    let filteredPlaylist = [];

    // Playlist
    const playlist = [
        { title: "Assam Rifles", artist: "KTSec234 & INDIAN ARMY", album: "INDIAN ARMY", url: "assamrefaile.mp3", art: "images/image28.jpg" },
        { title: " thumak thumak", artist: "Kritika", album: "KRITIKA", url: "kritikavoice.mp3", art: "images/kritika_sketch.jpg" },
        { title: "लग जा गले", artist: " Lata Mangeshkar", album: "LOVE", url: "love1.mp3", art: "images/image.jpg" },
        { title: "Tuition Badmashi Kaa", artist: " Faujdar, Kiran, Masoom Sharma", album: "HARAYANA", url: "Tuition_Badmashi_Kaa_Hemant_Faujdar,_Kiran,_Masoom_Sharma,_Manisha.mp3", art: "images/image17.jpg" },
        { title: "bhola parvat ka", artist: "KTSec234", album: "BHAGWAN KE BAJAN", url: "_Mai_bhola_parvat_ka_Bholenath_kaka_Devo_ke_dev_mahadev_Shiv_Sati.mp3", art: "images/image4.jpg" },
        { title: "Radha (Unconditional Love)", artist: "Kaka WRLD", album: "BHAGWAN KE BAJAN", url: "Kaka_WRLD_Radha_Unconditional_Love_Official_Video_Pellet_Drum_Productions.mp3", art: "images/image5.jpg" },
        { title: "RADHA RANI LAGE", artist: "SIMPAL KHAREL", album: "BHAGWAN KE BAJAN", url: "RADHA_RANI_LAGE_SIMPAL_KHAREL_NEW_SONG_RADHA_KRISHNA_BHAJAN_2023.mp3", art: "images/image5.jpg" },
        { title: "रावण रचित शिव तांडव स्तोत्रम्", artist: "Shiv Tandav Stotram", album: "BHAGWAN KE BAJAN", url: "audio6.mp3", art: "images/image4.jpg" },
        { title: "श्री हनुमान चालीसा 🚩🙏", artist: " Shankar Mahadevan", album: "BHAGWAN KE BAJAN", url: "audio7.mp3", art: "images/image2.jpg" },
        { title: "कबीर दोहे", artist: "Jubin Nautiyal", album: "BHAGWAN KE BAJAN", url: "Jubin_Nautiyal_Kabira_Lyrical_Video_कबीर_दोहे_Raaj_Aashoo_Lovesh.mp3", art: "images/image6.jpg" },
        { title: "So Dukh Kaisa Paavee", artist: "Jassie Gill", album: "BHAGWAN KE BAJAN", url: "So_Dukh_Kaisa_Paave_Jassie_Gill_Jaya_Kishori_Gurnazar_Devotional.mp3", art: "images/image8.jpg" },
        { title: "Backbone", artist: "Harrdy Sandhu", album: "FAVOURITE", url: "audio21.mp3", art: "images/image7.jpg" },
        { title: "Tu Meri Rani", artist: "Guru Randhawa", album: "FAVOURITE", url: "audio22.mp3", art: "images/image11.jpg" },
        { title: "Made in India", artist: "Guru Randhawa", album: "FAVOURITE", url: "audio23.mp3", art: "images/image13.jpg" },
        { title: "Yaari Meri Yaari Hai", artist: "Tony Kakkar", album: "FAVOURITE", url: "audio24.mp3", art: "images/image10.jpg" },
        { title: "PRADA", artist: "JASS MANAK", album: "FAVOURITE", url: "audio25.mp3", art: "images/image9.jpg" },
        { title: "DIL KO KARRAR AAYA", artist: "Neha Kakkar", album: "FAVOURITE", url: "audio26.mp3", art: "images/image14.jpg" },
        { title: "Guilty", artist: " Inder Chahal", album: "FAVOURITE", url: "audio27.mp3", art: "images/image16.jpg" },
        { title: "ISHARE TERE", artist: "Guru Randhawa", album: "FAVOURITE", url: "audio28.mp3", art: "images/image11.jpg" },
        { title: "Butterfly", artist: "JASS MANAK", album: "FAVOURITE", url: "audio29.mp3", art: "images/image9.jpg" },
        { title: "आरंभ है प्रचंड बोले मस्तको के झुंड", artist: "Piyush Mishra", album: "FAVOURITE", url: "audio30.mp3", art: "images/image20.jpg" },
        { title: "SHOORVEER 3 - A Tribute to छत्रपति शिवाजी महाराज", artist: "Rapperiya Baalam Ft", album: "FAVOURITE", url: "audio41.mp3", art: "images/image15.jpg" },
        { title: "Tu Aake Dekhle", artist: "King", album: "FAVOURITE", url: "audio42.mp3", art: "images/image18.jpg" },
        { title: "Aankhon Mein Aansoo", artist: " Yasser Desai", album: "FAVOURITE", url: "audio43.mp3", art: "images/image21.jpg" },
        { title: "Club Pub", artist: "Bohemia, Sukhe", album: "RANDOM SONG", url: "audio31.mp3", art: "images/image22.jpg" },
        { title: "GOA BEACH", artist: "Neha Kakkar", album: "RANDOM SONG", url: "audio32.mp3", art: "images/image25.jpg" },
        { title: "4MenDown", artist: "Millind Gaba", album: "RANDOM SONG", url: "audio33.mp3", art: "images/image24.jpg" },
        { title: "All Black", artist: "Sukhe | Raftaar", album: "RANDOM SONG", url: "audio34.mp3", art: "images/image27.jpg" },
        { title: "Ram Aayenge", artist: "Vishal Mishra", album: "BHAGWAN KE BAJAN", url: "audio4.mp3", art: "images/image30.jpg" },
        { title: "Bhagatt Aadmi", artist: "Masoom Sharma", album: "HARAYANA", url: "Bhagatt_Aadmi_Tha_Masoom_Sharma_Pranjal_Dahiya,_Aman_Jaji_New_Haryanvi.mp3", art: "images/image3.jpg" },
        { title: "Khasa Aala Chahar Jai Veeru", artist: " Khasa Aala Chahar", album: "HARAYANA", url: "Khasa_Aala_Chahar_Official_Video_Jai_Veeru_Bamboo_Beats_New_Haryanvi.mp3", art: "images/image19.jpg" },
        { title: "Narayan Mil Jayega", artist: " Jubin Nautiyal", album: "BHAGWAN KE BAJAN", url: "audio5.mp3", art: "images/image30.jpg" },
        { title: "Blue Eyes", artist: "Yo Yo Honey Singh", album: "FAVOURITE", url: "audio44.mp3", art: "images/image33.jpg" },
        { title: "Z BLACK", artist: "KD DESIROCK", album: "HARAYANA", url: "audio16.mp3", art: "images/image23.jpg" },
        { title: "Pistal", artist: "PS Polist", album: "HARAYANA", url: "audio20.mp3", art: "images/image17.jpg" },
        { title: "Father Saab", artist: "Khasa Aala Chahar", album: "HARAYANA", url: "audio13.mp3", art: "images/image26.jpg" },
        { title: "DESH MERE", artist: "Ajay D, Sanjay D, Ammy V", album: "INDIAN ARMY", url: "indanarmy2.mp3", art: "images/image28.jpg" },

    ];

    // Intro animation and player reveal
    startBtn.addEventListener('click', () => {
        logo.classList.add('moved');
        introContainer.classList.add('hidden');
        playerWrapper.classList.add('active');
        loadAndPlay(0);
    });

    // Get unique albums
    const albums = ['All', ...new Set(playlist.map(track => track.album))];

    // Render album list
    function renderAlbumList() {
        albumListEl.innerHTML = '';
        albums.forEach(album => {
            const li = document.createElement('li');
            li.textContent = album;
            li.className = album === currentAlbum ? 'active' : '';
            li.addEventListener('click', () => {
                currentAlbum = album;
                filterAndRenderPlaylist();
                document.querySelectorAll('.album-list li').forEach(item => {
                    item.className = item.textContent === currentAlbum ? 'active' : '';
                });
            });
            albumListEl.appendChild(li);
        });
    }

    // Filter and render playlist
    function filterAndRenderPlaylist() {
        filteredPlaylist = currentAlbum === 'All' ? playlist : playlist.filter(track => track.album === currentAlbum);
        currentAlbumTitle.textContent = currentAlbum === 'All' ? 'All Tracks' : currentAlbum;
        playlistEl.innerHTML = '';
        filteredPlaylist.forEach((track, index) => {
            const li = document.createElement('li');
            li.className = index === currentTrackIndex && track.album === playlist[currentTrackIndex].album ? 'active' : '';
            li.innerHTML = `
                <div class="song-info">
                    <span class="song-title">${track.title}</span>
                    <span class="song-artist">${track.artist}</span>
                </div>
                <span class="song-duration">--:--</span>
            `;
            li.addEventListener('click', () => loadAndPlay(index));
            playlistEl.appendChild(li);
        });
    }

    // Load track
    function loadTrack(index) {
        currentTrackIndex = (index < 0) ? filteredPlaylist.length - 1 : (index >= filteredPlaylist.length) ? 0 : index;
        const track = filteredPlaylist[currentTrackIndex];
        audioPlayer.src = track.url;
        trackTitle.textContent = 'Loading...';
        albumName.textContent = `${track.artist} - ${track.album}`;
        albumArt.src = track.art;
        document.querySelectorAll('.playlist li').forEach((item, i) => {
            item.className = i === currentTrackIndex ? 'active' : '';
        });
        progress.style.width = '0%';
        currentTimeEl.textContent = '0:00';
    }

    // Play track
    function playTrack() {
        audioPlayer.play().then(() => {
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            document.querySelector('.music-card').classList.add('is-playing');
        }).catch(err => console.error('Play error:', err));
    }

    // Pause track
    function pauseTrack() {
        audioPlayer.pause();
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        document.querySelector('.music-card').classList.remove('is-playing');
    }

    // Load and play
    function loadAndPlay(index) {
        loadTrack(index);
        playTrack();
    }

    // Format time
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Simulate listener count
    let fakeListeners = 42;
    function updateListenerCount() {
        fakeListeners += Math.floor(Math.random() * 3) - 1;
        fakeListeners = Math.max(10, Math.min(100, fakeListeners));
        listenerCountEl.textContent = fakeListeners;
        socialListenerCountEl.textContent = fakeListeners;
    }
    setInterval(updateListenerCount, 5000);

    // Event Listeners
    playPauseBtn.addEventListener('click', () => isPlaying ? pauseTrack() : playTrack());
    prevBtn.addEventListener('click', () => loadAndPlay(currentTrackIndex - 1));
    nextBtn.addEventListener('click', () => loadAndPlay(currentTrackIndex + 1));

    volumeSlider.addEventListener('input', () => {
        const volume = volumeSlider.value / 100;
        audioPlayer.volume = volume;
        volumeIcon.className = `fas ${volume > 0.5 ? 'fa-volume-up' : volume > 0 ? 'fa-volume-down' : 'fa-volume-mute'}`;
    });

    progressBar.addEventListener('click', (e) => {
        const width = progressBar.clientWidth;
        const clickX = e.offsetX;
        audioPlayer.currentTime = (clickX / width) * audioPlayer.duration;
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const { currentTime, duration } = audioPlayer;
        if (!isNaN(duration)) {
            progress.style.width = `${(currentTime / duration) * 100}%`;
            currentTimeEl.textContent = formatTime(currentTime);
            totalTimeEl.textContent = formatTime(duration);
        }
    });

    audioPlayer.addEventListener('loadedmetadata', () => {
        trackTitle.textContent = filteredPlaylist[currentTrackIndex].title;
        totalTimeEl.textContent = formatTime(audioPlayer.duration);
    });

    audioPlayer.addEventListener('ended', () => loadAndPlay(currentTrackIndex + 1));
    audioPlayer.addEventListener('error', () => {
        console.error('Audio error:', audioPlayer.error.message);
        trackTitle.textContent = 'Error loading track';
    });

    // Initialize
    renderAlbumList();
    filterAndRenderPlaylist();
});
