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