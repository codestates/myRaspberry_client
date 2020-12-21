const count = () => {
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
export default count;
