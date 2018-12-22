// --------------------------------------
// 10 - Select Header and Layout-Header and let their heights be equal
// --------------------------------------

const header			= document.querySelector('.l-header');
const lheader			= document.querySelector('.l-header__container');

header.style.height 	= lheader.offsetHeight + "px";