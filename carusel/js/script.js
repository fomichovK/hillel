
let l = 0;

let shift = document.querySelector('.miniatures');
let buttonLeft = document.querySelector('#butLeft');
let buttonRight = document.querySelector('#butRight');
let present = document.querySelector('.bigImg');

shift.style.left = 0;
let i = 0

buttonLeft.onclick = function (){
	if (i != 0){
		i += 137
		shift.style.left = i + 'px';
	}
} 

buttonRight.onclick = function (){
	let listLength = [...shift.children].length;
	let j = (listLength-4)*(-137);
	if (i != j){
		i -= 137
		shift.style.left = i + 'px';
	}
}


function setImg(img){
	document.getElementById('bigImg').src = img;
}

function getImgList(){;
	let imgList = [...shift.children];
	for(let i=0; i<imgList.length; i++){
		imgList[i].onclick = function(){
			setImg(imgList[i].src);
		}
	}
}
getImgList();





