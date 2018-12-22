//==========================================
// SCRIPTS CONTAINED IN THIS FILE
//==========================================

/*

Files dir: javascript/modules

04_menuTogglingHeader.js
06_mainNavToggling.js
09_subsThmbAssign.js
10_headerHeightEqualization.js
12_mediaPlayoffHeight.js
13_footerToggling.js

*/

// --------------------------------------
// 04 - Menu toggling - Icons from Header
// --------------------------------------

const icnHeader 	 = document.querySelectorAll(`.l-header__notif, 
												  .l-header__messages,	
												  .l-header__account`);

for (let i = 0; i < icnHeader.length; i++) {

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

	window.addEventListener('click', function(event) {
		if (icnHeader[i].contains(event.target) && flag === 0){
	   	 	icnHeader[i].children[0].children[0].style.display = "block";
	   	 	flag = 1;
	 	 } else {
	    	icnHeader[i].children[0].children[0].style.display = "none";
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
// 09 - Subscription extended menu - Thumbnails Assignment
// --------------------------------------

// Random Number Generator Function

const subsSelect  = document.querySelectorAll('.subs-nav > ul li img');
const thmbPath  = '../img/thumbnails';

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
// 12 - Media Playoff Resize Adjustment
// --------------------------------------

// After many hours of trying to get this right... This is the way!
// However, this is not 100% stable... Try rezise and clicking the menu on your own until break it.

const mejsContainer			= document.querySelector('#mep_0');
const mediaPlayoffVideoItem = document.querySelector('video');

window.addEventListener('load', () => {

	// Calculate width and heigth from the beginning.

	adjustVideoSize();	

});

window.addEventListener('resize', () => {

	// Calculation of 100% width is needed since mediaElement resizes on its own.
	// This rezise from mediaElement breaks or layout.

	adjustVideoSize();

});

window.addEventListener('load', () => {

	menuIcon.addEventListener( 'click', function() {

		adjustVideoSize();

	});

});

function adjustVideoSize() {

	mejsContainer.style.width = 'calc(100%)';
	mediaPlayoffVideoItem.style.width = 'calc(100%)';
	heightContainer = 1080/1920 * mediaPlayoffVideoItem.offsetWidth + "px";
	mejsContainer.style.height   = heightContainer;
	mediaPlayoffVideoItem.style.height = heightContainer;

};

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