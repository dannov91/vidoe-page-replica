// =========== CAROUSEL ALGORYTHM ============ //

// Initial Variable Declarations --> Selection or Empty Values 

const carousel = document.querySelector('.section-categories ul');
const childCount = carousel.childElementCount;
const carouselWidth = carousel.style.width = (childCount*100) + "%";

let clickCount = 0;
let itemsInVisual = 0;

// Media Query Breakpoints for Carousel
const smallBp = matchMedia('(min-width: 576px)');
const mediumBp = matchMedia('(min-width: 768px)');
const largeBp = matchMedia('(min-width: 992px)');

// Media Queries

const changeSizeSmall = function(mql) {
	if (mql.matches) {
		carousel.style.width = childCount*100/2 + "%";
		console.log('flag from Small');
	} else {
		console.log('Out from Small');
		carousel.style.width = childCount*100/1 + "%";
	}
}

const changeSizeMedium = function(mql) {
	if (mql.matches) {
		carousel.style.width = childCount*100/3 + "%";
		console.log('flag from Medium');
	} else {
		console.log('Out from Medium');
		changeSizeSmall(smallBp);
	}
}

const changeSizeLarge = function(mql) {
	if (mql.matches) {
		carousel.style.width = childCount*100/4 + "%";
		console.log('flag from Large');
	} else {
		changeSizeMedium(mediumBp);
		console.log('Out from Large');
	}
}

smallBp.addListener(changeSizeSmall);
mediumBp.addListener(changeSizeMedium);
largeBp.addListener(changeSizeLarge);

changeSizeSmall(smallBp);
changeSizeMedium(mediumBp);
changeSizeLarge(largeBp);

// Functions
	
	// Main Action Functions

	refreshIntervalId = setInterval( rightClickAction, 2500);
	icnArrowRight.addEventListener('click', rightClickAction);
	icnArrowLeft.addEventListener('click', leftClickAction);

	// Right Click Function

	function rightClickAction () {

		clearInterval(refreshIntervalId); // --> Clears the accumulated time from refreshInterval Id
		CSSRightAdjustment ();
		clickCountSum ("right");
		moveCarouselAbs("right");
		maxClicksCalc();
		initPosRight ();
		refreshIntervalId = setInterval( rightClickAction, 2500); // --> Creates a new time set Interval 

	}

	// Left Click Function

	function leftClickAction () {

		clearInterval(refreshIntervalId); // --> Clears the accumulated time from refreshInterval Id
		CSSRightAdjustment ();
		clickCountSum ("left");
		moveCarouselAbs("left");
		maxClicksCalc();
		maxPosLeft ();
		refreshIntervalId = setInterval( rightClickAction, 2500); // --> Creates a new time set Interval 
		
	}

	// Helper Functions

		//CSS Right Adjustment --> The value of "right" is transferred to "translateX"
		// 						   The transition is temporalily turned off to avoid fuzzy behaviour.

		function CSSRightAdjustment () {

			if (parseInt(carousel.style.right, 10) !== 0) {

				let rightAdjustment = parseInt(carousel.style.transform.match(/\d+/)[0]) + parseInt(carousel.style.right, 10);
				carousel.classList.add('noTransition');
				carousel.style.transform = 'translateX(-' + rightAdjustment + 'px)';
				window.getComputedStyle(carousel).transform; // --> Extremely important to effectively turn off transition.
				carousel.classList.remove('noTransition');

			}

		}

		// clickCount sum

		function clickCountSum (direction) {

			if (direction === "right") {
				clickCount += 1;
			} else if (direction === "left") {
				clickCount -= 1;
			}

		}

		// Move Carousel --> Absolute positioning with TranslateX

		function moveCarouselAbs (direction) {

			let itemWidth = carousel.firstElementChild.offsetWidth;
			carousel.style.right = "0px";

			if (direction === "right") {
				let moveCarousel = clickCount*itemWidth;
				carousel.style.transform = 'translateX(-' + moveCarousel + 'px)';
			} else if (direction === "left") {
				let moveCarousel = -(clickCount*itemWidth);
				carousel.style.transform = 'translateX(' + moveCarousel + 'px)';
			}

		}

		// Max Clicks Calculation

		function maxClicksCalc () {

			let visualWidth = carousel.parentNode.offsetWidth;
			let carouselWidth = carousel.offsetWidth;
			itemsInVisual = Math.round(visualWidth/(carouselWidth/childCount));
			maxClicks = childCount - itemsInVisual;

		}

		// Carousel Goes to Initial Position --> Right Arrow

		function initPosRight () {
			if (clickCount > maxClicks) {
				carousel.style.transform = 'translateX(0px)';
				carousel.style.right = '0px';
				clickCount = 0;
			}
		}

		// Carousel Goes to Max Position --> Left Arrow

		function maxPosLeft () {
			if (clickCount < 0 ) {
				let moveCarousel = maxClicks*carousel.firstElementChild.offsetWidth;
				carousel.style.transform = 'translateX(-' + moveCarousel + 'px)';
				carousel.style.right = '0px';
				clickCount = maxClicks;
			}
		}

$(window).on('load', () => {

	// Initial NUMERICAL Values for carousel objects
	// The variables declared ABOVE are selectors or empty values.

	carousel.style.transform = 'translateX(0px)';
	carousel.style.right = '0px';
	let visualWidth = carousel.parentNode.offsetWidth;
	let carouselWidth = carousel.offsetWidth;
	itemsInVisual = Math.round(visualWidth/(carouselWidth/childCount));

})

window.addEventListener('resize', () => {

	// CSS Re-positioning when Resizing

	let actualPosition = parseInt(carousel.style.transform.match(/\d+/)[0]);
	let diff = actualPosition - carousel.firstElementChild.offsetWidth*(clickCount);
	carousel.style.right = -diff + 'px'; //--> relative positioning with CSS "right" property
										 //    using "diff" as guide.

	// Items In Visual Permanent Evaluation

	let visualWidthEvaluation = carousel.parentNode.offsetWidth;
	let carouselWidthEvaluation = carousel.offsetWidth;
	let itemsInVisualEvaluation = Math.round(visualWidthEvaluation/(carouselWidthEvaluation/childCount));

	// If a change of layout occurs in terms of "how many items are displayed"...

	if ( itemsInVisualEvaluation > itemsInVisual ) {

		let itemsDiff = itemsInVisualEvaluation - itemsInVisual;
		itemsInVisual = itemsInVisualEvaluation;

		// If it is not the first item, then...

		if ( clickCount !== 0 ) {
			clickCount -= itemsDiff; // --> How many positions it should jump back.
			let itemWidth = carousel.firstElementChild.offsetWidth;
			let moveCarousel = -(clickCount*itemWidth);
			carousel.style.right = '0px'; // --> 0px since we are moving it absolutely with moveCarousel

			// If moveCarousel is negative, it should move.
			// If not, it means it has gone beyond the first item,
			// which is why we set TranslateX to 0px and reset clickCount

			if (moveCarousel < 0) {
				carousel.style.transform = 'translateX(' + moveCarousel + 'px)';
			} else {
				carousel.style.transform = 'translateX(0px)';
				clickCount = 0;
			}

		}

	} else if (itemsInVisualEvaluation < itemsInVisual) {
		itemsInVisual = itemsInVisualEvaluation; // --> Updating the itemsInVisual variable value. 
	}

});