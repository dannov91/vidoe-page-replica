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