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