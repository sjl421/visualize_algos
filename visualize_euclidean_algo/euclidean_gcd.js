$(function () {
	window.EuclidGCD = function (num1, num2) {
		this.largerStartNum = num1 >= num2 ? num1 : num2;
		this.smallerStartNum = num1 < num2 ? num1 : num2;
		this.remainders = [this.largerStartNum, this.smallerStartNum, this.largerStartNum % this.smallerStartNum];
		this.recursiveCalls = 0;
		this.status = 'tall';

		var x = this.smallerStartNum;
		var y = this.largerStartNum;
		this.lines = [ // four lines determined by thier start and end points
			[[0, 0], [x, 0]],
			[[x, 0], [x, y]],
			[[x, y], [0, y]],
			[[0, y], [0, 0]]
		];
	};

	EuclidGCD.prototype.step = function () {
		var lastRem = this.remainders[this.remainders.length - 1];
		if (lastRem <= 0) {
		this.status = 'done';
			return;
		}
		var secondLastRem = this.remainders[this.remainders.length - 2];

		var newRem = secondLastRem % lastRem;
		this.remainders.push(newRem);
		this.recursiveCalls++;
		this.status = this.status == 'tall' ? 'long' : 'tall';
	};

	EuclidGCD.prototype.fillDivs = function () {
		var lastRem = this.remainders[this.remainders.length - 1];
		var secondLastRem = this.remainders[this.remainders.length - 2];
		var thirdLastRem = this.remainders[this.remainders.length - 3];
		$('#larger-num').html(thirdLastRem);
		$('#smaller-num').html(secondLastRem);
		$('#remainder').html(lastRem);
		$('#num-calls').html(this.recursiveCalls);

		$GCD = $('#GCD');
		if (this.status === 0) {
			$GCD.html("Still looking...");
		} else {
			$GCD.html(secondLastRem);
		}
	};

	EuclidGCD.prototype.draw = function () {
		var canvas = $("#canvas")[0];
		var context = canvas.getContext("2d");
		context.clearRect(0, 0, canvas.width, canvas.height);
		drawLines(canvas, context, this.lines);
	};

	function drawLines (canvas, context, lines) {
		context.beginPath();
		lines.forEach(function (line) {
			context.moveTo(line[0][0], line[0][1]);
	        context.lineTo(line[1][0], line[1][1]);
		});
		context.stroke();
		context.closePath();
	}
});
