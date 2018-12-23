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