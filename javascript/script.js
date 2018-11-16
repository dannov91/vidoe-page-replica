/*Variable Declarations*/

// Selection - Carousel

let catCards = document.querySelector('.section-categories ul');
let carouselWidth = catCards.parentNode.offsetWidth;
let sumRight = 0;
let totalTranslate = 0;
let totalCarousel = 0;

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
let carouselRight = 0;
let rightClick = 0;

// =========== EVENT SECTION ============ //




// Carousel

catCards.style.transition = "transform 1s";
catCards.style.transform = 'translateX(-' + carouselRight + 'px)';

$icnArrowRight.on('click', function () {

	rightClick += 1;
	carouselWidth = catCards.parentNode.offsetWidth;

	// The following evaluation was born because the css property "right"
	// could have a NaN value when the page loaded.
	// That messed up the calculation.

	if (isNaN(parseInt(catCards.style.right, 10))) {
		sumRight = 0;
	} else {
		sumRight = parseInt(catCards.style.right, 10);
	}

	carouselRight += carouselWidth;
	catCards.style.transform = 'translateX(-' + carouselRight + 'px)';

	totalTranslate = parseInt(catCards.style.transform.match(/\d+/)[0]);
	totalCarousel = totalTranslate + sumRight;

	//

	if (totalCarousel === catCards.offsetWidth) {
		catCards.style.transform = 'translateX(0px)';
		catCards.style.right = '0px';
		carouselRight = 0;
		sumRight = 0;
		rightClick = 0;
		totalCarousel = 0;
	}

});

$icnArrowLeft.on('click', function () {

	totalTranslate = (catCards.offsetWidth/8)*7;

	if (totalCarousel === 0) {
		catCards.style.transform = 'translateX(-' + totalTranslate + 'px)';
		catCards.style.right = '0px';
		carouselRight = totalTranslate;
		sumRight = 0;
		rightClick = 7;
	}

});

const fixDiff = (width) => { return width/(catCards.offsetWidth/8) }







// Window load - Resizing

$(window).on('load', () => {

	carouselWidth = catCards.parentNode.offsetWidth;
	$darkelmnt.css("height", $imgHeight.css("height"));

	$(window).on('resize', () => {

		// Carousel Width - Resizing

		let diff = carouselWidth - catCards.parentNode.offsetWidth;
		catCards.style.right = sumRight - diff*rightClick + 'px';

		// console.log('The diff is: ' + diff);
		// console.log('diffCarousel Right value: ' + diffCarouselRight);
		// console.log('Carousel Right value: ' + carouselRight);
		// console.log('List Item width: ' + catCards.parentNode.offsetWidth);
		// catCards.style.transform = 'translateX(-' + diffCarouselRight + 'px)';

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
