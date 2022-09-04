let audios = ["Audio_One.mp3","Audio_Two.mp3","Audio_Three.mp3"];
let covers = ["./img/cover1.jpg","./img/cover2.jpg","./img/cover3.jpg"];
let texts = ["KING KONG SONG","NO TRUST","SHOTS FIRED"];

let fillbar = document.querySelector(".fill");
let currentTime = document.querySelector(".time");
let play = document.querySelector(".fa-play");
let pause = document.querySelector(".play-pause");
let backward = document.querySelector(".fa-backward");
let forward = document.querySelector(".fa-forward");
let image = document.querySelector(".image");
let decrease = document.querySelector(".decrease");
let increase = document.querySelector(".increase");
let volumeVolume = document.querySelector(".fa-volume-up");
let volumeBtn = document.querySelector(".volume-up");
let text = document.querySelector(".text");
let heart = document.querySelector(".far");
let modalOpen = document.querySelector(".fa-bars");
let modalClose = document.querySelector(".fa-times");
let modal = document.querySelector(".modal");
let modalBtn = document.querySelectorAll(".btn-audio");
let audioCheck = document.querySelector(".audio-check")

let audio = new Audio();
let currentSong = 0;

const zero = e => e < 10 ? "0" + e: e;

window.onload = playSong;

function playSong(){
    audio.src = `./audio/${audios[currentSong]}`;
    audio.play();
    togglePlayPause();
}

function togglePlayPause(){
    pause.addEventListener("click",(e) => {
        e.preventDefault();

        if(audio.paused){
            play.classList.remove("fa-play");
            play.classList.add("fa-pause");
            audio.play();
        } else {
            play.classList.add("fa-play");
            play.classList.remove("fa-pause");
            audio.pause();
        }
    });
}

function totalTime(seconds){
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);

    currentTime.textContent += " - " + zero(min) + ":" + zero(sec);
}

function convertTime(seconds){
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);

    currentTime.textContent = zero(min) + ":" + zero(sec);

    totalTime(Math.round(audio.duration));
}

function nextAudio(){
    currentSong++;

    if(currentSong > audios.length - 1){
        currentSong = 0;
    }
    playSong();
    play.classList.remove("fa-play");
    play.classList.add("fa-pause");
    
    
    $('.img img').attr("src",covers[currentSong]);
    text.textContent = texts[currentSong];
}

function prevAudio(){
    currentSong--;
    
    if(currentSong == -1){
        currentSong = audios.length - 1;
    }
    playSong();
    play.classList.remove("fa-play");
    play.classList.add("fa-pause");
    
    
    $('.img img').attr("src",covers[currentSong]);
    text.textContent = texts[currentSong];
}

function decreaseVolume(){
    audio.volume -= 0.25;
    scanVolume();
}

function increaseVolume(){
    audio.volume += 0.25;
    scanVolume();
}

function scanVolume(){
    if(audio.volume == 0){
        volumeVolume.classList.add("fa-volume-mute");
        volumeVolume.classList.remove("fa-volume-up");
    } else {
        volumeVolume.classList.remove("fa-volume-mute");
        volumeVolume.classList.add("fa-volume-up");
    }
}

function forsearch(){
    modalBtn.forEach(e => {
        e.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    });
}

audio.addEventListener("timeupdate", () => {
    fillbar.style.width = ((audio.currentTime / audio.duration) * 100) + "%";

    convertTime(Math.round(audio.currentTime));

    if(audio.ended){
        nextAudio();
    }
});

backward.addEventListener("click", (e) => {
    e.preventDefault();
    prevAudio();
    togglePlayPause()
});
forward.addEventListener("click", (e) => {
    e.preventDefault();
    nextAudio();
    togglePlayPause()
});

decrease.addEventListener("click", decreaseVolume);
increase.addEventListener("click",increaseVolume);

volumeBtn.addEventListener("click", (e) => {
    e.preventDefault();

    
    if(audio.volume != 0){
        audio.volume = 0;
    } else if(audio.volume == 0){
        audio.volume = 1;
    }
    scanVolume();
});

heart.addEventListener("click", () => {
    if(heart.classList.contains("far")){
        heart.classList.remove("far");
        heart.classList.add("fas");
    } else {
        heart.classList.add("far");
        heart.classList.remove("fas");
    }
});

modalOpen.addEventListener("click", () => {
    modal.classList.add("active");

    forsearch(modalBtn);
});

modalClose.addEventListener("click", () => {
    modal.classList.remove("active");
});


// modalBtn.addEventListener("click", () => {
//     modal.classList.remove("active");
// });