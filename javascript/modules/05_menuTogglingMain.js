// --------------------------------------
// 05 - Menu toggling - Icons from Main
// --------------------------------------

const icnMainContent = document.querySelectorAll('.sort--by');

for (let i = 0; i < icnMainContent.length; i++) {

	let menuTraversing = icnMainContent[i]
						.previousElementSibling
						.previousElementSibling;

 	// Same notes from Icons from header menu toggling

    let flag = 0;

	window.addEventListener('click', function(event) {

		if (icnMainContent[i].contains(event.target) && flag === 0) {
	   	 	menuTraversing.style.display = "block";
	   	 	flag = 1;
	 	 } else{
	    	menuTraversing.style.display = "none";
	    	flag = 0;
	 	 }

	});

}