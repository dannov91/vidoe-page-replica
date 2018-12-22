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