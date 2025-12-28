document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.raffle-slider');
  if (!slider) return;

  const track = slider.querySelector('.slider-track');

  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let currentIndex = 0;
  const totalSlides = track.children.length;

  function setPosition() {
    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  function setIndex(index) {
    currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
    currentTranslate = -currentIndex * slider.offsetWidth;
    prevTranslate = currentTranslate;
    track.style.transition = 'transform .4s ease';
    setPosition();
  }

  function dragStart(x) {
    isDragging = true;
    startX = x;
    track.style.transition = 'none';
    track.style.animation = 'none';
  }

  function dragMove(x) {
    if (!isDragging) return;
    const delta = x - startX;
    currentTranslate = prevTranslate + delta;
    setPosition();
  }

  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    const moved = currentTranslate - prevTranslate;

    if (moved < -80) setIndex(currentIndex + 1);
    else if (moved > 80) setIndex(currentIndex - 1);
    else setIndex(currentIndex);

    track.style.animation = 'sliderMove 18s infinite';
  }

  // Touch
  slider.addEventListener('touchstart', e => dragStart(e.touches[0].clientX));
  slider.addEventListener('touchmove', e => dragMove(e.touches[0].clientX));
  slider.addEventListener('touchend', dragEnd);

  // Mouse
  slider.addEventListener('mousedown', e => dragStart(e.clientX));
  slider.addEventListener('mousemove', e => dragMove(e.clientX));
  slider.addEventListener('mouseup', dragEnd);
  slider.addEventListener('mouseleave', dragEnd);
});
