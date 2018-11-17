/*Variable Declarations*/

// Selection - Carousel

let carousel = document.querySelector('.section-categories ul');
let carouselVisualWidth = carousel.parentNode.offsetWidth;
let carouselItemWidth = carousel.firstElementChild.offsetWidth;

let cssRightTracking = 0;		// --> Keeps Track of the carousel's "right" css property
let totalTranslate = 0;			// --> Used to calculate the Total Translate in each click event in the arrows. Fundamental for reseting positioning.
let totalCarousel = 0;			// --> Used to calcule the total offset (totalTranslate + cssRightTracking)
let moveCarousel = 0;			// --> Used to calculate how much the carousel has to translate in each click event in the arrows.
let clickCount = 0;				// --> Used to compensate the css "right" property

// Selection - Arrows and Card Categories

const $icnArrowLeft = $('.icn-arrow-left');
const $icnArrowRight = $('.icn-arrow-right');
const $card = $('.section-categories .card');

// Selection - Video Images

const videoSelect = document.querySelectorAll('.section-featured .video-container');
const videoPath = 'img/video';
const videoImgPath = {
	v1: videoPath + '/v1.png',
	v2: videoPath + '/v2.png',
	v3: videoPath + '/v3.png',
	v4: videoPath + '/v4.png',
	v5: videoPath + '/v5.png',
	v6: videoPath + '/v6.png',
	v7: videoPath + '/v7.png',
	v8: videoPath + '/v8.png',
}

const $imgHeight = $('.video > a:first-of-type');
const $darkelmnt = $('.dark');

// Counters

let counter = 0;

// =========== EVENT SECTION ============ //




// Carousel

carousel.style.transition = "transform 1s";
carousel.style.transform = 'translateX(-' + moveCarousel + 'px)';

$icnArrowRight.on('click', function () {

	clickCount += 1;
	carouselItemWidth = carousel.firstElementChild.offsetWidth; // --> Update variable value.

	// The following evaluation was born because the css property "right"
	// could have a NaN value when the page loaded.
	// That messed up the calculation.

	if (isNaN(parseInt(carousel.style.right, 10))) {
		cssRightTracking = 0;
	} else {
		cssRightTracking = parseInt(carousel.style.right, 10);
	}

	moveCarousel += carouselItemWidth;
	carousel.style.transform = 'translateX(-' + moveCarousel + 'px)';

	if (clickCount >= 8) {
		carousel.style.transform = 'translateX(0px)';
		carousel.style.right = '0px';
		moveCarousel = 0;
		cssRightTracking = 0;
		clickCount = 0;
	}

});

$icnArrowLeft.on('click', function () {

	clickCount -= 1;
	carouselItemWidth = carousel.firstElementChild.offsetWidth;

	// The following evaluation was born because the css property "right"
	// could have a NaN value when the page loaded.
	// That messed up the calculation.

	if (isNaN(parseInt(carousel.style.right, 10))) {
		cssRightTracking = 0;
	} else {
		cssRightTracking = parseInt(carousel.style.right, 10);
	}

	moveCarousel -= carouselItemWidth;
	carousel.style.transform = 'translateX(-' + moveCarousel + 'px)';

	if (clickCount < 0) {
		console.log(clickCount);
		totalTranslate = (carousel.offsetWidth/8)*7;
		carousel.style.transform = 'translateX(-' + totalTranslate + 'px)';
		carousel.style.right = '0px';
		moveCarousel = totalTranslate;
		cssRightTracking = 0;
		clickCount = 7;
	}

});







// Window load - Resizing

$(window).on('load', () => {

	carouselItemWidth = carousel.parentNode.offsetWidth;
	$darkelmnt.css("height", $imgHeight.css("height"));

	$(window).on('resize', () => {

		// Carousel Width - Resizing

		let diff = carouselItemWidth - carousel.parentNode.offsetWidth;
		carousel.style.right = cssRightTracking - diff*clickCount + 'px';

		// Dark Screen - Resizing

		$darkelmnt.css("height", $imgHeight.css("height"));
	});

});

/*Channel Categories Arrows Transition*/

$icnArrowLeft.on('mouseover', function () {
	this.style.backgroundColor = 'black';
	this.style.color = 'white';
});

$icnArrowLeft.on('mouseout', function () {
	this.style.backgroundColor = 'rgb(219, 219, 219)';
});

$icnArrowRight.on('mouseover', function () {
	this.style.backgroundColor = 'black';
	this.style.color = 'white';
});

$icnArrowRight.on('mouseout', function () {
	this.style.backgroundColor = 'rgb(219, 219, 219)';
});

/*Channel Categories Thumbnail Expand*/

$card.on('mouseover', function() {
	this.children[0].children[0].style.transform = 'scale(1.15)';
});

$card.on('mouseout', function() {
	this.children[0].children[0].style.transform = 'scale(1)';
});

/*Featured Videos img Assign*/

for (let i in videoImgPath) {
	videoSelect[counter].src = videoImgPath[i];
	counter += 1;
}

// Selection - Video Containers - Objective: Create Badge Timer HTML <div> nodes

$('.video > a:first-of-type').prepend(`<div class="badge badge-red badge-timer"> 3:50</div>`);

// Matching Dark Screen to Parent Height

$('.dark').css("height", $imgHeight);
