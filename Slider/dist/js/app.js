const slides = document.querySelectorAll('.slider__item');
const buttons = document.querySelectorAll('.slider__btn');
const prev = document.getElementById('btn-prev');
const next = document.getElementById('btn-next');

let index = 0;

const activeSlide = function(n) {
    for(slide of slides) {
        slide.classList.remove('active');
    }
    slides[n].classList.add('active');
};

const activeButton = function(n) {
    for(button of buttons) {
        button.classList.remove('active');
    }
    buttons[n].classList.add('active');
};

const prepareCurrentSlide = function(ind) {
    activeSlide(index);
    activeButton(index);
};


buttons.forEach(function(item, indexBtn) {
    item.addEventListener('click', function() {
        index = indexBtn;
        prepareCurrentSlide(index);
    });
});

const nextSlide = function() {
    if (index == slides.length - 1) {
        index = 0;
        prepareCurrentSlide(index);
    } else {
        index++;
        prepareCurrentSlide(index);
    }
};

const prevSlide = function() {
    if (index == 0) {
        index = slides.length - 1;
        prepareCurrentSlide(index);
    } else {
        index--;
        prepareCurrentSlide(index);
    }
};

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

setInterval(nextSlide, 2000);