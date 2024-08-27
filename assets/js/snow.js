var duration = 60 * 1000 * 3;
var animationEnd = Date.now() + duration;
var skew = 1;

let frameCount = 0;
const skipFrames = 5; // 每 3 帧更新一次（1 + 2）

function randomInRange(min, max) {
	return Math.random() * (max - min) + min;
}

(function frame() {
	var timeLeft = animationEnd - Date.now();
	var ticks = Math.max(300, 500 * (timeLeft / duration));
	skew = Math.max(0.8, skew - 0.001);

	frameCount++;
	if (frameCount % skipFrames === 0) {
		confetti({
			particleCount: 1,
			startVelocity: 0,
			ticks: ticks,
			origin: {
				x: Math.random(),
				// since particles fall down, skew start toward the top
				y: Math.random() * skew - 0.2,
			},
			colors: ['#ffffff'],
			shapes: ['circle'],
			gravity: randomInRange(0.4, 0.6),
			scalar: randomInRange(0.4, 0.8),
			drift: randomInRange(-0.4, 0.4),
		});
	}
	if (timeLeft > 0) {
		requestAnimationFrame(frame);
	}
})();
