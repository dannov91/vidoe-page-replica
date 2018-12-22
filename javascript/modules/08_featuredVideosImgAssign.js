// --------------------------------------
// 08 - Featured Videos img Assign
// --------------------------------------

let counter = 0;
const videoPath = 'img/video';
const videoSelect = document.querySelectorAll('.video img');

const videoImgPath = {
	v1: videoPath + '/v1.png',
	v2: videoPath + '/v2.png',
	v3: videoPath + '/v3.png',
	v4: videoPath + '/v4.png',
	v5: videoPath + '/v5.png',
	v6: videoPath + '/v6.png',
	v7: videoPath + '/v7.png',
	v8: videoPath + '/v8.png',
}

for (let i in videoImgPath) {
	videoSelect[counter].src = videoImgPath[i];
	counter += 1;
}