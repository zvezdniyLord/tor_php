let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const navButtons = document.querySelectorAll('.nav-button');
const totalSlides = slides.length;

document.getElementById('prev').addEventListener('click', () => {
  currentSlide = (currentSlide > 0) ? currentSlide - 1 : totalSlides - 1;
  updateSlider();
});

document.getElementById('next').addEventListener('click', () => {
  currentSlide = (currentSlide < totalSlides - 1) ? currentSlide + 1 : 0;
  updateSlider();
});

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateSlider();
}

function updateSlider() {
  document.querySelector('.slides').style.transform = 'translateX(-' + (1000 * currentSlide) + 'px)';
  navButtons.forEach(button => button.classList.remove('active'));
  navButtons[currentSlide].classList.add('active');
}