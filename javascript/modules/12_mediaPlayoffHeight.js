// --------------------------------------
// 12 - Media Playoff Height
// --------------------------------------

const lMediaPlayoff			= document.querySelector('.l-media-playoff');
const mediaPlayoff			= document.querySelector('#mep_0');

mediaPlayoff.style.height = lMediaPlayoff.offsetHeight + "px";

window.addEventListener('resize', () => {

	mediaPlayoff.style.height = lMediaPlayoff.offsetHeight + "px";

});