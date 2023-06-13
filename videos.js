<script src="https://www.youtube.com/iframe_api"></script>

const videoIds = ["VIDEO_ID_1", "VIDEO_ID_2", "VIDEO_ID_3"];

// Initialize YouTube player API
let players = [];

function onYouTubeIframeAPIReady() {
  videoIds.forEach((videoId, index) => {
    const player = new YT.Player(`player${index + 1}`, {
      height: "360",
      width: "640",
      videoId: videoId,
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
    players.push(player);
  });
}

// Handle player ready event
function onPlayerReady(event) {
  event.target.pauseVideo();
}

// Handle player state change event
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    pauseOtherPlayers(event.target);
  }
}

// Pause other players when one starts playing
function pauseOtherPlayers(currentPlayer) {
  players.forEach((player) => {
    if (player !== currentPlayer) {
      player.pauseVideo();
    }
  });
}

// Slider functionality
const slider = document.querySelector(".slider");
const progressBarItemCount = document.querySelector(".progress-bar")
  .children.length;
let sliderIndex = 0;

document.querySelector(".left-handle").addEventListener("click", slideLeft);
document
  .querySelector(".right-handle")
  .addEventListener("click", slideRight);

function slideLeft() {
  sliderIndex = (sliderIndex - 1 + progressBarItemCount) % progressBarItemCount;
  updateSlider(sliderIndex);
}

function slideRight() {
  sliderIndex = (sliderIndex + 1) % progressBarItemCount;
  updateSlider(sliderIndex);
}

function updateSlider(index) {
  slider.style.transform = `translateX(calc(${index} * -100%))`;
  calculateProgressBar();

  players.forEach((player) => {
    player.pauseVideo();
  });

  const currentPlayer = players[index];
  currentPlayer.playVideo();
  pauseOtherPlayers(currentPlayer);
}

function calculateProgressBar() {
  const progressBar = document.querySelector(".progress-bar");
  const progressItems = progressBar.querySelectorAll(".progress-item");
  progressItems.forEach((item, index) => {
    if (index === sliderIndex) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  const translatePercentage = (sliderIndex / progressBarItemCount) * 100;
  progressBar.style.transform = `translateX(${translatePercentage}%)`;
}
  