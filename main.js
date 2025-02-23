const slides = [
  {
    image: './image/2.jpg',
    title: 'Tropical paradise '
  },
  {
    image: './image/3.jpg',
    title: 'Cityscape'
  },
  {
    image: './image/1.jpg',
    title: 'European'
  },
  
];


let currentSlide = 0;
const mainSlider = document.querySelector('.main-slider');
const currentSlideElement = document.querySelector('.current');
const totalSlides = document.querySelector('.total');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const thumbnails = document.querySelectorAll('.thumbnail');

// Initialize total slides
totalSlides.textContent = String(slides.length).padStart(2, '0');

function updateSlide() {
  // Update background image
  mainSlider.style.backgroundImage = `url(${slides[currentSlide].image})`;

  // Update slide counter
  currentSlideElement.textContent = String(currentSlide + 1).padStart(2, '0');

  // Update thumbnails
  thumbnails.forEach((thumb, index) => {
    thumb.classList.toggle('active', index === currentSlide);
  });

  // Update title text dynamically
  document.querySelector('.title').innerHTML = `Explore the<br>${slides[currentSlide].title}<br>Adventure`;
}
 
  // Update slide counter
  currentSlideElement.textContent = String(currentSlide + 1).padStart(2, '0');
  
  // Update thumbnails
  thumbnails.forEach((thumb, index) => {
    if (index === currentSlide) {
      thumb.classList.add('active');
    } else {
      thumb.classList.remove('active');
    }
  });


function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlide();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlide();
}

// Event listeners
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Thumbnail click handlers
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    currentSlide = index;
    updateSlide();
  });
});

// Initialize first slide
updateSlide();

// Optional: Auto-slide every 5 seconds
setInterval(nextSlide, 4000);