
var audio = document.getElementById("mainSong");
var iconoMusica = document.getElementById("iconoMusica");


function toggleAudio() {
    audio.volume = 0.5;
    
    if (audio.paused) {
        audio.play();
        iconoMusica.classList.remove("fa-volume-xmark");
        iconoMusica.classList.add("fa-volume-high");
    } else {
        audio.pause();
        iconoMusica.classList.remove("fa-volume-high");
        iconoMusica.classList.add("fa-volume-xmark");
    }
}