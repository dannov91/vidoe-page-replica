/*Variable Declarations*/

// Selection - Arrows and Card Categories

const $icnArrowLeft = $('.icn-arrow-left');
const $icnArrowRight = $('.icn-arrow-right');
const $card = $('.card');

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

// Window load - Resizing

$(window).on('load', () => {

	$darkelmnt.css("height", $imgHeight.css("height"));

	$(window).on('resize', () => {
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
