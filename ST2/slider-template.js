const API_URL = 'https://picsum.photos/';
const BIG_SIZE = '600/400';
const SMALL_SIZE = '60';

const IMAGES = [
    '?image=1080',
    '?image=1079',
    '?image=1069',
    '?image=1063',
    '?image=1050',
    '?image=1039'
];

// Slide number to be displayed
let numberImage = 0;

/**
 * We display the images, and read the click.
 * By clicking on the image, we change the slide.
 */
const previews = document.getElementById('slider-previews');
IMAGES.forEach(function (element) {
    let li = document.createElement('li');
    let img = document.createElement('img');
    img.setAttribute('src', API_URL + SMALL_SIZE + element);
    li.addEventListener('click', function () {
        displaySlide(API_URL + BIG_SIZE + element, this);
        numberImage = IMAGES.indexOf(element);
    });
    li.appendChild(img);
    previews.appendChild(li);
});

/**
 * Handle keystrokes. If you clicked left or right, change the slide.
 */
document.addEventListener('keydown', function (e) {
    switch (e.code) {
        case 'ArrowRight' :
            numberImage = numberImage !== IMAGES.length - 1 ? numberImage + 1 : 0;
            break;
        case 'ArrowLeft' :
            numberImage = numberImage !== 0 ? numberImage - 1 : IMAGES.length - 1;
            break;
        default :
            return;
    }
    displaySlide(API_URL + BIG_SIZE + IMAGES[numberImage], search(numberImage));
});

/**
 * searches for the selected item at preview
 * @param number element
 * @returns {HTMLLIElement} number element
 */
function search(number) {
    return document.getElementById('slider-previews').getElementsByTagName('li')[number];
}

// previous selected image
let lastElement;

/**
 * display a slide, make a frame for the selected image
 * @param src image link
 * @param element at preview
 */
function displaySlide(src, element) {
    let slide = document.getElementById('slide');
    slide.setAttribute('src', src);
    element.classList.add('current');
    if (typeof (lastElement) != "undefined" && lastElement !== null) {
        lastElement.classList.remove('current');
    }
    lastElement = element;
}

// print the first slide
displaySlide(API_URL + BIG_SIZE + IMAGES[0], search(0));