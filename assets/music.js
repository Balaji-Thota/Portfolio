// document.addEventListener('DOMContentLoaded', function() {
//     const bgMusic = document.getElementById('bgMusic');
//     const musicToggle = document.getElementById('musicToggle');
//     const icon = musicToggle.querySelector('i');

//     // Function to play music
//     function playMusic() {
//         bgMusic.play().then(() => {
//             musicToggle.classList.remove('muted');
//             icon.classList.remove('fa-volume-mute');
//             icon.classList.add('fa-volume-up');
//         }).catch(error => {
//             console.log("Playback failed:", error);
//         });
//     }

//     // Function to pause music
//     function pauseMusic() {
//         bgMusic.pause();
//         musicToggle.classList.add('muted');
//         icon.classList.remove('fa-volume-up');
//         icon.classList.add('fa-volume-mute');
//     }

//     // Auto-play music when page loads (after user interaction)
//     // document.addEventListener('click', function autoPlayHandler() {
//     //     playMusic();
//     //     document.removeEventListener('click', autoPlayHandler);
//     // }, { once: true });

//     // Toggle music on button click
//     musicToggle.addEventListener('click', function() {
//         if (bgMusic.paused) {
//             playMusic();
//         } else {
//             pauseMusic();
//         }
//     });
// });


document.addEventListener('DOMContentLoaded', function () {
    const bgMusic = document.getElementById('bgMusic'); // Background music element
    const musicToggle = document.getElementById('musicToggle'); // Music toggle button
    const icon = musicToggle.querySelector('i'); // Icon inside the toggle button

    // Function to play or pause music
    function toggleMusic() {
        if (bgMusic.paused) {
            bgMusic.play()
                .then(() => {
                    // Update the icon to volume-up when playing
                    icon.classList.remove('fa-volume-mute');
                    icon.classList.add('fa-volume-up');
                })
                .catch(error => {
                    console.error("Music playback failed:", error);
                });
        } else {
            bgMusic.pause();
            // Update the icon to volume-mute when paused
            icon.classList.remove('fa-volume-up');
            icon.classList.add('fa-volume-mute');
        }
    }

    // Attach event listener only to the toggle button
    musicToggle.addEventListener('click', toggleMusic);
});
