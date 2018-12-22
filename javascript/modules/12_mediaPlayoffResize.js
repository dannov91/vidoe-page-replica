// --------------------------------------
// 12 - Media Playoff Resize Adjustment
// --------------------------------------

// In very rare cases, this resizing breaks.

const mejsContainer			= document.querySelector('#mep_0'); //--> mediaElement generates this Id.
const mediaPlayoffVideoItem = document.querySelector('video');

window.addEventListener('load', () => {

	// Calculate width and heigth from the beginning.

	adjustVideoSize();

	// Add Event Handler to the menu icon

	menuIcon.addEventListener( 'click', function() {

		adjustVideoSize();

	});

});

window.addEventListener('resize', () => {

	// Calculation of 100% width is needed since mediaElement
	// resizes on its own, but this resize is not suitable in this case.

	adjustVideoSize();

});

function adjustVideoSize() {

	// Height Assignment/Adjustment
	mejsContainer.style.width = 'calc(100%)';
	mediaPlayoffVideoItem.style.width = 'calc(100%)';

	// 1080/1920 is the relation between width/height
	// necessary for correct height assignment.
	heightContainer = 1080/1920 * mediaPlayoffVideoItem.offsetWidth + "px";

	// Height Assignment/Adjustment
	mejsContainer.style.height   = heightContainer;
	mediaPlayoffVideoItem.style.height = heightContainer;

};