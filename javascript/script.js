/*Variable Declarations*/

const $icnArrowLeft = $('.icn-arrow-left');
const $icnArrowRight = $('.icn-arrow-right');
const $card = $('.card');

/*Channel Categories Arrows Transition*/

$icnArrowLeft.on('mouseover', () => {
	$icnArrowLeft.attr('style',`
	 background-color: black;
	 color: white;
	 `);
});

$icnArrowLeft.on('mouseout', () => {
	$icnArrowLeft.attr('style', `
		background-color: rgb(219, 219, 219);
		`);
});

$icnArrowRight.on('mouseover', () => {
	$icnArrowRight.attr('style',`
	background-color: black;
	color: white;
	 `);
});

$icnArrowRight.on('mouseout', () => {
	$icnArrowRight.attr('style', `
		background-color: rgb(219, 219, 219);
		`);
});

/*Channel Categories Thumbnail Expand*/

$card.on('mouseover', function() {
	this.children[0].children[0].style.transform = 'scale(1.15)';
});

$card.on('mouseout', function() {
	this.children[0].children[0].style.transform = 'scale(1)';
});