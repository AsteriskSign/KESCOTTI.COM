document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.querySelector(".progress-bar");
  const slider = document.querySelector(".slider");
  const handles = document.querySelectorAll(".handle");

  handles.forEach((handle) => {
    handle.addEventListener("click", () => {
      onHandleClick(handle, progressBar, slider);
    });
  });

  calculateProgressBar();

  window.addEventListener("resize", () => {
    throttleProgressBar();
  });
});

function onHandleClick(handle, progressBar, slider) {
  const sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  );
  const progressBarItemCount = progressBar.children.length;

  if (handle.classList.contains("left-handle")) {
    const newIndex =
      sliderIndex - 1 < 0 ? progressBarItemCount - 1 : sliderIndex - 1;
    updateSlider(newIndex, progressBar, slider);
  } else if (handle.classList.contains("right-handle")) {
    const newIndex = (sliderIndex + 1) % progressBarItemCount;
    updateSlider(newIndex, progressBar, slider);
  }
}

function updateSlider(index, progressBar, slider) {
  slider.style.setProperty("--slider-index", index);
  calculateProgressBar();

  const videos = slider.querySelectorAll("video");
  videos.forEach((video) => {
    video.pause();
  });

  const visibleVideos = slider.querySelectorAll(
    `video:nth-child(${index + 1})`
  );
  visibleVideos.forEach((video) => {
    video.play();
  });
}

function calculateProgressBar() {
  const progressBar = document.querySelector(".progress-bar");
  const progressBarItemCount = progressBar.children.length;
  const sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  );

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

let resizeTimeout;
function throttleProgressBar() {
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      calculateProgressBar();
    }, 500);
  }
}