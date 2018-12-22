// --------------------------------------
// 03 - Carousel Thumbnail Expand - JQuery
// --------------------------------------

const $card = $('.section--categories .card');

$card.on('mouseover', function() {
	this.children[0].children[0].style.transform = 'scale(1.15)';
});

$card.on('mouseout', function() {
	this.children[0].children[0].style.transform = 'scale(1)';
});