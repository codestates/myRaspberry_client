// function counterNumber() {
// 	console.log("실행은 되는거냐?");
// 	const counter = document.querySelector(".counter");
// 	let fullTime = 1500;
// 	let countTime = 5;

// 	let numText = counter.innerHTML;
// 	let numTextArrayLeng = numText.length;
// 	let c = 0;
// 	let textWriteTime = fullTime / numTextArrayLeng;

// 	counter.innerHTML = "";
// 	for (let i = numTextArrayLeng - 1; i >= 0; i--) {
// 		let numTextArrayI = numText.charAt(i);
// 		let span = document.createElement("span");
// 		counter.appendChild(span);
// 		(function (numTextArrayI, i) {
// 			setTimeout(function () {
// 				printNum(numTextArrayI, i);
// 			}, textWriteTime * c);
// 			c++;
// 		})(numTextArrayI, i);
// 	}
// 	function printNum(thisNumber, numArray) {
// 		for (let j = countTime; j > 0; j--) {
// 			(function (thisNumber, numArray, j) {
// 				setTimeout(function () {
// 					aniNum(thisNumber, numArray, j);
// 				}, (textWriteTime / countTime) * j);
// 			})(thisNumber, numArray, j);
// 		}
// 	}

// 	function aniNum(thisNumber, numArray, j) {
// 		let randomNum = Math.floor(Math.random() * 9 + 1);
// 		if (j === countTime) {
// 			document.querySelector(
// 				`.counter span:nth-of-type(${numArray + 1})`
// 			).innerHTML = thisNumber;
// 		} else {
// 			document.querySelector(
// 				`.counter span:nth-of-type(${numArray + 1})`
// 			).innerHTML = randomNum;
// 		}
// 	}
// }
// function numberCounter(target_frame, target_number) {
// 	console.log(arguments);
// 	console.log(this);
// 	this.count = 0;
// 	this.diff = 0;
// 	this.target_count = parseInt(target_number);
// 	this.target_frame = document.querySelector(target_frame);
// 	this.timer = null;
// 	this.counter();
// }
// numberCounter.prototype.counter = function () {
// 	var self = this;
// 	this.diff = this.target_count - this.count;

// 	if (this.diff > 0) {
// 		self.count += Math.ceil(this.diff / 5);
// 	}

// 	this.target_frame.innerHTML = this.count
// 		.toString()
// 		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// 	if (this.count < this.target_count) {
// 		this.timer = setTimeout(function () {
// 			self.counter();
// 		}, 20);
// 	} else {
// 		clearTimeout(this.timer);
// 	}
// };

const test = () => {
	let counting = document.querySelectorAll(".counting");
	let countingArray = Array.prototype.slice.call(counting);
	countingArray.forEach(el => {
		let countTo = el.getAttribute("data-count");
		animate(
			function (newValue) {
				el.innerText = Math.floor(newValue);
			},
			0,
			countTo,
			3000,
			x => x
		);
	});

	function animate(render, from, to, duration, timeFx) {
		let startTime = performance.now();
		requestAnimationFrame(function step(time) {
			let pTime = (time - startTime) / duration;
			if (pTime > 1) pTime = 1;
			render(from + (to - from) * timeFx(pTime));
			if (pTime < 1) {
				requestAnimationFrame(step);
			}
		});
	}
};
export default test;
