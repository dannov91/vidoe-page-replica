// --------------------------------------
// 01 - Carousel Arrows Transitions
// --------------------------------------

const icnArrowLeft 	= document.querySelector('.icn-arrow-left');
const icnArrowRight = document.querySelector('.icn-arrow-right');

icnArrowLeft.addEventListener('mouseover', function (event) {
	icnArrowLeft.style.backgroundColor = 'black';
	icnArrowLeft.style.color = 'white';
});

icnArrowLeft.addEventListener('mouseout', function (event) {
	icnArrowLeft.style.backgroundColor = 'rgb(219, 219, 219)';
});

icnArrowRight.addEventListener('mouseover', function (event) {
	icnArrowRight.style.backgroundColor = 'black';
	icnArrowRight.style.color = 'white';
});

icnArrowRight.addEventListener('mouseout', function (event) {
	icnArrowRight.style.backgroundColor = 'rgb(219, 219, 219)';
});