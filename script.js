         const songs = [
            { title: "Summer Vibes", artist: "Chill Beats", duration: 245, icon: "☀️" },
            { title: "Midnight Dreams", artist: "Ambient Sounds", duration: 198, icon: "🌙" },
            { title: "Ocean Waves", artist: "Nature Mix", duration: 312, icon: "🌊" },
            { title: "Urban Rhythm", artist: "City Sounds", duration: 187, icon: "🏙️" },
            { title: "Forest Walk", artist: "Peaceful Tunes", duration: 265, icon: "🌲" }
        ];

        let currentSongIndex = 0;
        let isPlaying = false;
        let currentTime = 0;
        let duration = 0;
        let playInterval;

        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }

        function renderPlaylist() {
            const playlist = document.getElementById('playlist');
            playlist.innerHTML = songs.map((song, index) => `
                <div class="playlist-item ${index === currentSongIndex ? 'active' : ''}" 
                     onclick="selectSong(${index})">
                    <div class="playlist-icon">${song.icon}</div>
                    <div class="playlist-info">
                        <div class="playlist-title">${song.title}</div>
                        <div class="playlist-artist">${song.artist}</div>
                    </div>
                    <div class="playlist-duration">${formatTime(song.duration)}</div>
                </div>
            `).join('');
        }

        function loadSong(index) {
            const song = songs[index];
            currentSongIndex = index;
            currentTime = 0;
            duration = song.duration;

            document.getElementById('songTitle').textContent = song.title;
            document.getElementById('songArtist').textContent = song.artist;
            document.getElementById('albumArt').textContent = song.icon;
            document.getElementById('duration').textContent = formatTime(duration);
            document.getElementById('currentTime').textContent = formatTime(0);
            document.getElementById('progress').style.width = '0%';

            renderPlaylist();
        }

        function togglePlay() {
            isPlaying = !isPlaying;
            const playBtn = document.getElementById('playBtn');
            const albumArt = document.getElementById('albumArt');

            if (isPlaying) {
                playBtn.textContent = '⏸️';
                albumArt.classList.remove('paused');
                albumArt.classList.add('playing');
                startPlayback();
            } else {
                playBtn.textContent = '▶️';
                albumArt.classList.remove('playing');
                albumArt.classList.add('paused');
                stopPlayback();
            }
        }

        function startPlayback() {
            playInterval = setInterval(() => {
                currentTime++;
                
                if (currentTime >= duration) {
                    nextSong();
                    return;
                }

                updateProgress();
            }, 1000);
        }

        function stopPlayback() {
            if (playInterval) {
                clearInterval(playInterval);
            }
        }

        function updateProgress() {
            const progress = (currentTime / duration) * 100;
            document.getElementById('progress').style.width = progress + '%';
            document.getElementById('currentTime').textContent = formatTime(currentTime);
        }

        function selectSong(index) {
            const wasPlaying = isPlaying;
            if (isPlaying) {
                togglePlay();
            }
            loadSong(index);
            if (wasPlaying) {
                togglePlay();
            }
        }

        function nextSong() {
            const wasPlaying = isPlaying;
            if (isPlaying) {
                togglePlay();
            }
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            loadSong(currentSongIndex);
            if (wasPlaying) {
                togglePlay();
            }
        }

        function previousSong() {
            const wasPlaying = isPlaying;
            if (isPlaying) {
                togglePlay();
            }
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            loadSong(currentSongIndex);
            if (wasPlaying) {
                togglePlay();
            }
        }

        // Progress bar click
        document.getElementById('progressBar').addEventListener('click', (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const width = rect.width;
            const percentage = x / width;
            currentTime = Math.floor(duration * percentage);
            updateProgress();
        });

        // Volume control
        document.getElementById('volumeSlider').addEventListener('input', (e) => {
            const volume = e.target.value;
            // In a real app, this would control actual audio volume
            console.log('Volume set to:', volume);
        });

        // Initialize
        loadSong(0);
        renderPlaylist();
    
