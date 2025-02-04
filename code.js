document.addEventListener('DOMContentLoaded', function() {
    const musicList = document.getElementById('musicList');

    // Create a function to fetch and display mp3 files in the music folder
    function displayMusicList() {
        fetch('music/')
            .then(response => response.text())
            .then(text => {
                // Find all mp3 files
                const mp3Files = text.match(/href="([^"]+\.mp3)"/g);

                if (mp3Files) {
                    mp3Files.forEach((file) => {
                        const fileName = file.split('"')[1];

                        const musicElement = document.createElement('li');
                        musicElement.classList.add("music-item");

                        const label = document.createElement('span');
                        label.textContent = fileName.split('/')[2].split('.')[0]
                        musicElement.appendChild(label);

                        const musicPlayer = document.createElement('audio');
                        const source = document.createElement('source');
                        source.setAttribute('src', 'music/' + fileName.split('/')[2]);
                        source.setAttribute('type', 'audio/mpeg');
                        musicPlayer.setAttribute('controls', ''); // Add controls attribute
                        musicPlayer.appendChild(source);

                        musicElement.appendChild(musicPlayer); // Attach audio player to the list item
                        musicList.appendChild(musicElement);
                    });
                }
            })
            .catch(error => console.error('Error:', error));
    }

    // Call the function to display the music list
    displayMusicList();
});