//==========================================
// SCRIPTS CONTAINED IN THIS FILE
//==========================================

/*

Files dir: javascript/modules

01_carouselArrowsTransitions.js
02_scrollTopArrowFunction.js
03_carouselThumbnailExpand.js
04_menuTogglingHeader.js
05_menuTogglingMain.js
06_mainNavToggling.js
07_darkScreenHeightMatch.js
08_featuredVideosImgAssign.js
09_subsThmbAssign.js
10_headerHeightEqualization.js
11_finiteCarousel.js

*/

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

// --------------------------------------
// 02 - Scroll-top Arrow Function - JQuery
// --------------------------------------

// Select all anchor elements with id's "#top" and direct them
// to the top of the page. Using jQuery:

$(".l-sections__button").click(function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});

// Fading Effect

const btnScrollToTop 	= document.querySelector('.l-sections__button');

window.addEventListener('scroll', () => {

	if(window.scrollY >= 200) {

		btnScrollToTop.style.visibility = "visible";
		btnScrollToTop.style.opacity = "1";

	} else {

		btnScrollToTop.style.opacity = "0";

		// The setTimeout function needed a conditional first
		// because just after passing the 200px threshold,
		// the button was still hiding (just after).

		setTimeout(function () {
			if(window.scrollY < 200) {
				btnScrollToTop.style.visibility = "hidden";
			} else {
				btnScrollToTop.style.visibility = "visible";
			}

		}, 500)

	}

});

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

// --------------------------------------
// 04 - Menu toggling - Icons from Header
// --------------------------------------

// Done with jQuery for correct compatibility with
// mobile devices.

const $icnHeader = $(`.l-header__notif, 
  					  .l-header__messages,	
  					  .l-header__account`);

for (let i = 0; i < $icnHeader.length; i++) {

	// Menu is on when clicking the icon
	// Menu is off when:
		// A. any area outside the icon is clicked
		// B. the icon itself is clicked

	// The flag is to know if the icon was already clicked,
	// Adding it to the main conditional (flag===0) forbids
	// the inner block to execute (display = "block")
	// This way it will evaluate to else statement and
	// turn it off when clicking the icon again.

	let flag = 0;

	$(document).on('click', $icnHeader[i],  function(event) {

		if ($icnHeader[i].contains(event.target) && flag === 0){
	   	 	$icnHeader[i].children[0].children[0].style.display = "block";
	   	 	flag = 1;
	 	 } else {
	    	$icnHeader[i].children[0].children[0].style.display = "none";
	    	flag = 0;
	 	 }

	});

}

// --------------------------------------
// 05 - Menu toggling - Icons from Main
// --------------------------------------

// Done with jQuery for correct compatibility with
// mobile devices.

const $icnMainContent = $('.sort--by');

for (let i = 0; i < $icnMainContent.length; i++) {

	let menuTraversing = $icnMainContent[i]
						.previousElementSibling
						.previousElementSibling;

 	// Same notes from Icons from header menu toggling

    let flag = 0;

	$(document).on('click', $icnMainContent[i],  function(event) {

		if ($icnMainContent[i].contains(event.target) && flag === 0) {
	   	 	menuTraversing.style.display = "block";
	   	 	flag = 1;
	 	 } else{
	    	menuTraversing.style.display = "none";
	    	flag = 0;
	 	 }

	});

}

// --------------------------------------
// 06 - Main Nav Toggling
// --------------------------------------

const breakpoints = {
	sm:  '576px',
  	med: '768px',
  	lg:  '992px',
}

const brkptMed     = window.matchMedia('(min-width: ' + breakpoints.med + ')');
const menuIcon 	   = document.querySelector('.l-header__nav');

let variableToggler;

// menuToggler describes if the menu button was already pressed or not
// true --> the menu button was clicked, user wants it out from the screen
// false --> the menu button is not clicked or the user wants in to fully display on screen.

let menuToggler = false;

function adjustMainNav() {

	let toggle = false;

	if (brkptMed.matches) {

		// Remove the addEventListener from 768px or lower

		menuIcon.removeEventListener('click', navToggleMobile, true);

		// Ensure that the side nav is displayed

		const lSideNav = document.querySelector('.l-primary-container .l-main-nav');
		lSideNav.style.display = "block";

		// Check if the menu button was pressed

		if(menuToggler) {
			rmvExtendedClasses();
		} else {
			addExtendedClasses();
		}

		// Closure Declaration

		variableToggler = navToggleLargerDevices();

		// addEventListener

		menuIcon.addEventListener('click', variableToggler, true);

	} else {

		// Remove the addEventListener from 768px or greater

		menuIcon.removeEventListener('click', variableToggler, true);

		// Remove the extension classes
		
		rmvExtendedClasses();

		// Check if the menu button was pressed

		const lSideNav 			= document.querySelector('.l-primary-container .l-main-nav');
		const lMainContent 		= document.querySelector('#main');

		if(menuToggler) {
			lSideNav.style.display = "none";
			lMainContent.classList += " main--expanded";
		} else {
			lSideNav.style.display = "block";
			lMainContent.classList.remove("main--expanded");
		}

		// addEventListener

		menuIcon.addEventListener('click', navToggleMobile, true);

	}
}

function navToggleMobile() {

	// I had to declare these variables again since:
	// 1. Having navToggleMobile with arguments executes the function inside addEventListener and the handler doesn't work
	// 2. If there are no arguments, the scope of navToggleMobile() is outside from the scope of adjustMainNav()

	const lSideNav 			= document.querySelector('.l-primary-container .l-main-nav');
	const lMainContent 		= document.querySelector('.main');

	if (lSideNav.style.display === "block") {
		lSideNav.style.display = "none";
		lMainContent.classList += " main--expanded";
	} else {
		lSideNav.style.display = "block";
		lMainContent.classList.remove("main--expanded");
	}

	menuToggler = !menuToggler;

}

function navToggleLargerDevices() {

	let toggle = !menuToggler;

	function toggler() {

		if(toggle) {

			rmvExtendedClasses();

			toggle = !toggle;

		} else {

			addExtendedClasses();

			toggle = !toggle;

		}

		menuToggler = !menuToggler;

	}

	return toggler;

}

function addExtendedClasses() {

	const lSideNav 			= document.querySelector('.l-primary-container .l-main-nav');
	const lExtendedSubs 	= document.querySelector('.subs-nav');
	const mainNav			= document.querySelector('.main-nav');
	const rightChevron 		= document.querySelectorAll('.main-nav .fa-chevron-right');
	const lMainContent 		= document.querySelector('.main');
	 
	mainNav.classList 			+= ' main-nav--extended';
	lSideNav.classList 			+= ' l-main-nav--extended';
	lMainContent.classList.remove ('main--expanded');
	lMainContent.classList   	+= ' main--simplified';
	lExtendedSubs.style.display =  'block';

	for (let i = 0; i < rightChevron.length; i++) {
		rightChevron[i].style.display = 'block';
	}

}

function rmvExtendedClasses() {

	const lSideNav 			= document.querySelector('.l-primary-container .l-main-nav');
	const navPositioner		= document.querySelector('.l-main-nav__positioner');
	const lExtendedSubs 	= document.querySelector('.subs-nav');
	const mainNav			= document.querySelector('.main-nav');
	const rightChevron 		= document.querySelectorAll('.main-nav .fa-chevron-right');
	const lMainContent 		= document.querySelector('.main');

	mainNav.classList.remove 		('main-nav--extended');
	lSideNav.classList.remove		('l-main-nav--extended');
	lMainContent.classList.remove 	('main--simplified');
	lMainContent.classList.remove   ('main--expanded');
	lExtendedSubs.style.display     = 'none';

	for (let i = 0; i < rightChevron.length; i++) {
		rightChevron[i].style.display = 'none';
	}

}

adjustMainNav();
brkptMed.addListener(adjustMainNav);

// --------------------------------------
// 07 - Dark Screen Height Matching
// --------------------------------------

const $imgHeight = $('.video > a:first-of-type');
const $darkelmnt = $('.dark-screen');

$('.dark-screen').css("height", $imgHeight);

// --------------------------------------
// 08 - Featured Videos img Assign
// --------------------------------------

let counter = 0;
const videoPath = 'img/video';
const videoSelect = document.querySelectorAll('.video img');

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

for (let i in videoImgPath) {
	videoSelect[counter].src = videoImgPath[i];
	counter += 1;
}

// --------------------------------------
// 09 - Subscription extended menu - Thumbnails Assignment
// --------------------------------------

// Random Number Generator Function

const subsSelect  = document.querySelectorAll('.subs-nav > ul li img');
const thmbPath  = 'img/thumbnails';

function randomIntFromInterval(min,max) { // min and max included
    return Math.floor(Math.random()*(max-min+1)+min);
}

for(let i = 0; i < subsSelect.length; i++) {
	subsSelect[i].src = thmbPath + "/s" + randomIntFromInterval(1, 9) + ".png";
}

// --------------------------------------
// 10 - Select Header and Layout-Header and let their heights be equal
// --------------------------------------

const header			= document.querySelector('.l-header');
const lheader			= document.querySelector('.l-header__container');

header.style.height 	= lheader.offsetHeight + "px";

// --------------------------------------
// 11 - Finite Carousel
// --------------------------------------

// When the page loads, execute turnOnCarousels() function.

window.addEventListener('load', () => {
	turnOnFiniteCarousels();
});

// This function will get all DOM elements whose ID Class starts with "carousel".

function turnOnFiniteCarousels () {

	const allCarousels = document.querySelectorAll('[id^=finite-carousel]');

	for (let i = 0; i < allCarousels.length; i++) {
		carouselFinite(allCarousels[i].id)
	}
	
}

// The Finite Carousel Function

function carouselFinite(carouselId) {
	// =======================================================================================
	// 1. VARIABLE DECLARATIONS AND INITIAL CONDITIONS
	// =======================================================================================

	// ---------------------------------------------------------------------------------------
	// 1.1 --> Carousel Inputs
	// ---------------------------------------------------------------------------------------

	const timeCounter = 2500; 				// --> Sets the time in ms for actioning carousel
	const margin = "3px";					// --> In-Between List Item Margins
	const direction = 1;					// --> Sets the timer direction of the carousel
											//     1 is RIGHT and any other value is LEFT

	const mediaQueries = {					// --> min-width: (mediaQueries.key)px
		smallBp: 480,						// --> Two items are displayed
		mediumBp: 768,						// --> Three items are displayed
		largeBp: 980,						// --> Four items are displayed
		xlargeBp: 1200						// --> Eight items are displayed
	}

	// ---------------------------------------------------------------------------------------
	// 1.2 --> Initial Variables - Selection or Global Variables
	// ---------------------------------------------------------------------------------------

	const carousel =
		document.querySelector
		('#' + carouselId);				    // --> Select the carousel item.
	const icnArrowRight = 					// --> Select the Right Arrow
		carousel.nextElementSibling
		.children[1];						
	const icnArrowLeft = 					// --> Select the Left Arrow
		carousel.nextElementSibling
		.children[0];	
	const childCount =						
		carousel.childElementCount;			// --> How many items are in the list.
	let carouselWidth =						// --> Carousel Total Width is calculated dependant of how many children it has.
		childCount*100 + "%"; 				//     Media Queries then resize the carousel according to how many childrens are displayed.			 
	let clickCount = 0;						// --> How many positions the Carousel has moved from the start 
	let itemsInVisual = 0;  				// --> How many items are visible in the current layout
	let itemsDiff = 0; 						// --> Variable used to evaluate if given a resize,
	 										//     how many items were added/substracted.
	 										//     Declared as global to avoid scope issues inside functions.
	let maxClicks = 0;  					// --> Describes what is the limit of clickCounts
	let refreshIntervalId = 0;				// --> Variable used for setting the time interval.
											//     It is used inside a function, so it was declared
											//     as a global variable to avoid scope issues.
	let flag = 0;							// --> Used to stop the carousel running if the number of children
											//     is equal or less than the actual display can hold

	// ---------------------------------------------------------------------------------------
	// 1.4 --> Margin Values Declaration & Assignment of Margins to List Items
	// ---------------------------------------------------------------------------------------

	const carouselChilds = carousel.children;

	for (const child of carouselChilds) {
	  child.style.marginLeft = margin;
	  child.style.marginRight = margin;
	}

	// =======================================================================================
	// 2. FUNCTIONS - STATIC WINDOW SIZE
	// =======================================================================================

	// ---------------------------------------------------------------------------------------
	// 2.1 --> Main Action Functions
	// ---------------------------------------------------------------------------------------

	// 2.1.1 --> Main Triggers

	carouselDirection(direction, timeCounter);					// --> Triggers carousel movement with setTimeOut
	icnArrowRight.addEventListener('click', rightClickAction);  // --> Moves Carousel to the Right
	icnArrowLeft.addEventListener('click', leftClickAction);	// --> Moves Carousel to the Left

	// 2.1.2 --> Main Functions

	function rightClickAction () {
		if (flag === 0) {
			clearInterval(refreshIntervalId); 						// --> Clears the accumulated time from refreshInterval Id
			CSSRightAdjustment ();
			clickCountSum ("right");
			maxClicksCalc();
			moveCarouselAbs("right");
			initPosRight ();
			carouselDirection(direction, timeCounter);			    // --> Creates a new time set Interval 
		}
	}

	function leftClickAction () {

		if (flag === 0) {
			clearInterval(refreshIntervalId); 						// --> Clears the accumulated time from refreshInterval Id
			CSSRightAdjustment ();
			clickCountSum ("left");
			maxClicksCalc();
			moveCarouselAbs("left");
			maxPosLeft ();
			carouselDirection(direction, timeCounter); 				// --> Creates a new time set Interval 
		}
	}

	// ---------------------------------------------------------------------------------------
	// 2.2 --> Helper Functions
	// ---------------------------------------------------------------------------------------

	function CSSRightAdjustment () { 							// --> The value of "right" is transferred to "translateX"
																// 	   The transition is temporalily turned off to avoid fuzzy behaviour.

		if (parseInt(carousel.style.right, 10) !== 0) {

			let rightAdjustment = 
				parseFloat(
				carousel.style.transform.match(/\d+/)[0])
			 	+ parseFloat(carousel.style.right, 10);
			carousel.classList.add('noTransition');
			carousel.style.transform =
				'translateX(-' + rightAdjustment + 'px)';
			window.getComputedStyle(carousel).transform; 		// --> Extremely important to effectively turn off transition.
			carousel.classList.remove('noTransition');

		}

	}

	function clickCountSum (direction) {						// --> clickCount will add 1 to its value if the action is triggered to the right
																//     clickCount will substract 1 to its value if the action is triggered to the left
		if (direction === "right") {
			clickCount += 1;
		} else if (direction === "left") {
			clickCount -= 1;
		}

	}

	function moveCarouselAbs (direction) {						// --> Moves the carousel to the right or to the left,
																//     it depends if the action is triggered to the right or left respectively

		let itemWidth = carousel.firstElementChild.offsetWidth;
		carousel.style.right = "0px";

		if (direction === "right") {
			let moveCarousel = clickCount*itemWidth;

			// Adjust moveCarousel with margin values, "right" case

			moveCarousel += parseFloat(margin, 10) * 2 * (clickCount);

			// Then move carousel with translateX

			carousel.style.transform = 'translateX(-' + moveCarousel + 'px)';

		} else if (direction === "left") {
			let moveCarousel = -(clickCount*itemWidth);

			// Adjust moveCarousel with margin values, "left" case

			moveCarousel -= parseFloat(margin, 10) * 2 * (clickCount);

			// Then move carousel with translateX

			carousel.style.transform = 'translateX(' + moveCarousel + 'px)';
		}

	}

	function maxClicksCalc () {									  // --> maxClicks is recalculated in terms of how many items are displayed
																  //     versus how many children the carousel has.
		let visualWidth = carousel.parentNode.offsetWidth;
		let carouselWidth = carousel.offsetWidth;
		itemsInVisual = Math.round(visualWidth/(carouselWidth/childCount));
		maxClicks = childCount - itemsInVisual;

	}

	function initPosRight () {									  // --> Moves carousel to the first item
		if (clickCount > maxClicks) {
			carousel.style.transform = 'translateX(0px)';
			carousel.style.right = '0px';
			clickCount = 0;
		}
	}

	function maxPosLeft () {									  // --> Moves carousel to the last item
		if (clickCount < 0 ) {

			let moveCarousel = maxClicks*carousel.firstElementChild.offsetWidth;

			// The following code adjusts moveCarousel with margin values, left limit case

				moveCarousel += parseFloat(margin, 10) * 2 * (maxClicks);

			carousel.style.transform = 'translateX(-' + moveCarousel + 'px)';
			carousel.style.right = '0px';
			clickCount = maxClicks;
		}
	}

	function carouselDirection(direction, timeCounter) {				//--> triggers the timing function depending
																		//    on the desired direction.
		if (direction === 1) {
			refreshIntervalId = setInterval(rightClickAction, timeCounter);
		} else {
			refreshIntervalId = setInterval(leftClickAction, timeCounter);
		}

	}

	function flagEvaluation () {

		if (childCount - itemsInVisual <= 0 ) {							// --> Evaluate if the carousel has to be stopped
			flag = 1;											
		} else {
			flag = 0;
		}

	}

	function mousingOverCarouselItems () {												// --> Mousing over will stop carousel from automatic movement
																						//     mousing out will continue automatic carousel movement

		for(let i = 0; i < carousel.children.length; i++) {
			carousel.children[i].addEventListener('mouseover', () => {
				clearInterval(refreshIntervalId);
			});
			carousel.children[i].addEventListener('mouseout', () => {
				carouselDirection(direction, timeCounter);
			});
		}

	}

	// ---------------------------------------------------------------------------------------
	// 2.3 --> Media Queries Functions
	// ---------------------------------------------------------------------------------------

	// 2.3.1 --> Functions

	const changeSizeSmall = function(mql) {
		if (mql.matches) {
			carousel.style.width = childCount*100/2 + "%";
		} else {
			carousel.style.width = childCount*100/1 + "%";
		}
	}

	const changeSizeMedium = function(mql) {
		if (mql.matches) {
			carousel.style.width = childCount*100/3 + "%";
		} else {
			changeSizeSmall(smallBp);
		}
	}

	const changeSizeLarge = function(mql) {
		if (mql.matches) {
			carousel.style.width = childCount*100/4 + "%";
		} else {
			changeSizeMedium(mediumBp);
		}
	}

	const changeSizeXlarge = function(mql) {
		if (mql.matches) {
			carousel.style.width = childCount*100/8 + "%";
		} else {
			changeSizeLarge(largeBp);
		}

	}

	// 2.3.2 --> Functions Operations.
	//			 These variables need to go AFTER the function declarations
	//			 This is why they are located here.

	const smallBp = matchMedia('(min-width: ' + mediaQueries.smallBp + 'px)');
	const mediumBp = matchMedia('(min-width: ' + mediaQueries.mediumBp + 'px)');
	const largeBp = matchMedia('(min-width: ' + mediaQueries.largeBp + 'px)');
	const xlargeBp = matchMedia('(min-width: ' + mediaQueries.xlargeBp + 'px)');

	smallBp.addListener(changeSizeSmall);
	mediumBp.addListener(changeSizeMedium);
	largeBp.addListener(changeSizeLarge);
	xlargeBp.addListener(changeSizeXlarge);

	changeSizeSmall(smallBp);
	changeSizeMedium(mediumBp);
	changeSizeLarge(largeBp);
	changeSizeXlarge(xlargeBp);

	// ---------------------------------------------------------------------------------------
	// 1.3 --> Margin Values Declaration & Assignment of Margins to List Items
	// ---------------------------------------------------------------------------------------

	// --> Initial Numerical Values for carousel objects when resize occurs thanks
	//	   to the media queries of section 2.3.2, this sections needs to go AFTER.

	carousel.style.transform = 'translateX(0px)';
	carousel.style.right = '0px';
	let visualWidth = carousel.parentNode.offsetWidth;
	carouselWidth = carousel.offsetWidth;
	itemsInVisual = 
	Math.round(visualWidth/(carouselWidth/childCount));
	maxClicks = childCount - itemsInVisual;

	flagEvaluation ();
	mousingOverCarouselItems ();

	// =======================================================================================
	// 3. FUNCTIONS - DYNAMIC WINDOW RE-SIZE
	// =======================================================================================

	window.addEventListener('resize', () => {

	// ---------------------------------------------------------------------------------------
	// 3.1 --> Re-positioning when Re-sizing using "right" property
	// ---------------------------------------------------------------------------------------

		let actualPosition = parseInt(carousel.style.transform.match(/\d+/)[0]);
		let diff = actualPosition - (carousel.firstElementChild.offsetWidth
								  + parseFloat(margin, 10) * 2) * (clickCount);
		carousel.style.right = -diff + 'px'; //--> relative positioning with CSS "right" property
											 //    using "diff" as guide.

	// ---------------------------------------------------------------------------------------
	// 3.2 --> Items In Visual Permanent Evaluation
	// ---------------------------------------------------------------------------------------

		let visualWidthEvaluation = carousel.parentNode.offsetWidth;
		let carouselWidthEvaluation = carousel.offsetWidth;
		let itemsInVisualEvaluation = Math.round(visualWidthEvaluation/(carouselWidthEvaluation/childCount));

	// ---------------------------------------------------------------------------------------
	// 3.3 --> Media Queries Take Effect - Number of Items Displayed Changes
	// ---------------------------------------------------------------------------------------

	// 3.3.1 --> There are now more items displayed

		if ( itemsInVisualEvaluation > itemsInVisual ) {

			itemsDiff = itemsInVisualEvaluation - itemsInVisual;
			itemsInVisual = itemsInVisualEvaluation;

			flagEvaluation ();

			// If it is not the first item, then...

			if ( clickCount !== 0 ) {
				clickCount -= itemsDiff; 						// --> How many positions it should jump back.
				let itemWidth =
					carousel.firstElementChild.offsetWidth;
				let moveCarousel = -(clickCount*itemWidth);
				moveCarousel -=
					parseFloat(margin, 10) * 2 * (clickCount);
				carousel.style.right = '0px'; 					// --> 0px since we are moving it absolutely with moveCarousel

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

	// 3.3.2 --> There are now less items displayed

		} else if (itemsInVisualEvaluation < itemsInVisual) {
			itemsInVisual = itemsInVisualEvaluation;

			flagEvaluation ();

		}

	});

}

// --------------------------------------
// 13 - Footer Toggling
// --------------------------------------

// This script is dependant of 06_mainNavToggling.js

const lFooter	   = document.querySelector('.l-footer');
const footerPseudo = document.querySelector('.footer-pseudo');
const lSideNav 	   = document.querySelector('.l-primary-container .l-main-nav');

adjustFooter ();

function adjustFooter () {
	footerPseudo.style.width = lSideNav.offsetWidth + "px";
	lFooter.style.width = "calc(100% - " + lSideNav.offsetWidth + "px)";
};

menuIcon.addEventListener('click', adjustFooter);
brkptMed.addListener(adjustFooter);