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