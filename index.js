
// BMI PROJECT
document.getElementById('calculateBtn').addEventListener('click', function() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; 
  
    if (!weight || !height) {
      document.getElementById('result').innerText = 'Please enter valid values for weight and height';
      document.getElementById('result').classList.add('text-red-500');
      document.getElementById('result').classList.remove('text-green-500');
      return;
    }
  
    const bmi = weight / (height * height);
    let status = '';
  
    if (bmi < 18.5) {
      status = 'Underweight';
      document.getElementById('result').classList.add('text-red-500');
      document.getElementById('result').classList.remove('text-green-500');
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      status = 'Normal weight';
      document.getElementById('result').classList.add('text-green-500');
      document.getElementById('result').classList.remove('text-red-500');
    } else if (bmi >= 25 && bmi <= 29.9) {
      status = 'Overweight';
      document.getElementById('result').classList.add('text-red-500');
      document.getElementById('result').classList.remove('text-green-500');
    } else {
      status = 'Obesity';
      document.getElementById('result').classList.add('text-red-500');
      document.getElementById('result').classList.remove('text-green-500');
    }
  
    document.getElementById('result').innerText = `BMI: ${bmi.toFixed(2)} (${status})`;
  });

//   MUSIC PLAYER

const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const songTitle = document.getElementById('songTitle');
const artistName = document.getElementById('artistName');
const albumArt = document.getElementById('albumArt');
const audio = document.getElementById('audio');
const seekBar = document.getElementById('seekBar');

let isPlaying = false;
let currentSongIndex = 0;
let isShuffling = false;
let isRepeating = false;

const playlist = [
    {
        title: "Romeo and Juliet",
        artist: "Nino Rota",
        albumArt: "./assets/images/image1.jpg",
        audioSrc: "./assets/musics/08. Nino Rota - Romeo and Juliet.mp3"
    },
    {
        title: "Moment",
        artist: " Kenny G",
        albumArt: "./assets/images/moment.jpg",
        audioSrc: "./assets/musics/07. Kenny G - Moment.mp3"
    },
    {
        title: "Seasons",
        artist: "Richard Klayderman",
        albumArt: "./assets/images/season.jpg",
        audioSrc: "./assets/musics/06. Richard Klayderman - Seasons.mp3"
    }
];

function updateSong() {
    const song = playlist[currentSongIndex];
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    albumArt.src = song.albumArt;
    audio.src = song.audioSrc;
    if (isPlaying) {
        audio.play();
    }
}

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play fa-2x"></i>';
    } else {
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause fa-2x"></i>';
    }
    isPlaying = !isPlaying;
});

prevBtn.addEventListener('click', () => {
    if (isShuffling) {
        currentSongIndex = Math.floor(Math.random() * playlist.length);
    } else {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    }
    updateSong();
});

nextBtn.addEventListener('click', () => {
    if (isRepeating) {
        audio.currentTime = 0; 
        audio.play();
    } else if (isShuffling) {
        currentSongIndex = Math.floor(Math.random() * playlist.length);
    } else {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
    }
    updateSong();
});

shuffleBtn.addEventListener('click', () => {
    isShuffling = !isShuffling;
    shuffleBtn.style.color = isShuffling ? 'yellow' : 'white';
});

repeatBtn.addEventListener('click', () => {
    isRepeating = !isRepeating;
    repeatBtn.style.color = isRepeating ? 'yellow' : 'white';
});


audio.addEventListener('timeupdate', () => {
    seekBar.value = (audio.currentTime / audio.duration) * 100;
});


seekBar.addEventListener('input', () => {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
});


audio.addEventListener('ended', () => {
    nextBtn.click();
});


updateSong();




// countdown


const calculateEndTime = () => {
    const now = new Date();
    now.setDate(now.getDate() + 5); 
    return now.getTime();
};


const initializeCountdown = () => {
    let endTime = localStorage.getItem('countdownEndTime');

    if (!endTime) {
        endTime = calculateEndTime();
        localStorage.setItem('countdownEndTime', endTime);
    } else {
        endTime = parseInt(endTime, 10);
    }

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
            document.getElementById('days').innerText = "00";
            document.getElementById('hours').innerText = "00";
            document.getElementById('minutes').innerText = "00";
            document.getElementById('seconds').innerText = "00";
            localStorage.removeItem('countdownEndTime');
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

        setTimeout(updateCountdown, 1000);
    };

    updateCountdown();
};

initializeCountdown();



// FORM VALIDATION

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    document.getElementById('username-error').innerText = '';
    document.getElementById('email-error').innerText = '';
    document.getElementById('password-error').innerText = '';
    document.getElementById('repassword-error').innerText = '';


    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const repassword = document.getElementById('repassword').value;

    let isValid = true;

   
    if (!isNaN(username)) {
        document.getElementById('username-error').innerText = 'Username must not be a number.';
        isValid = false;
    }

 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('email-error').innerText = 'Please enter a valid email address.';
        isValid = false;
    }

  
    if (password.length < 6) {
        document.getElementById('password-error').innerText = 'Password must be at least 6 characters long.';
        isValid = false;
    }


    if (password !== repassword) {
        document.getElementById('repassword-error').innerText = 'Passwords do not match.';
        isValid = false;
    }

    if (isValid) {
      
        alert('Form submitted successfully!');
    }
});