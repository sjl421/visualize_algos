$(function () {
	window.BSarray = function (arr, target) {
		this.arr = arr.sort(function(a, b) { return a - b; });
		this.startPos = 0;
		this.endPos = arr.length - 1;
		this.midIdx = Math.floor((this.startPos + this.endPos) / 2);
		this.target = target;
	};

	BSarray.prototype.step = function () {
		var target = this.target;
		// base case
		if (this.startPos > this.endPos) return -1;

		// find the element or search on left and right side of array
		var midEl = this.arr[this.midIdx];
		if (midEl == target) {
			return this.midIdx;
		} else if (midEl > target) {
			this.endPos = this.midIdx - 1;
		} else {
			this.startPos = this.midIdx + 1;
		}
		this.midIdx = Math.floor((this.startPos + this.endPos) / 2);
		return null;
	};

	BSarray.prototype.draw = function () {
		var canvas = $("#canvas")[0];
		var context = canvas.getContext("2d");
		context.clearRect(0, 0, canvas.width, canvas.height);
		shadeBoxes(canvas, context, this.startPos, this.endPos, this.midIdx, this.arr.length);
		drawBoxes(canvas, context, this.arr.length);
		fillBoxes(canvas, context, this.arr);
	};

	function shadeBoxes (canvas, context, startPos, endPos, midIdx, numBoxes) {
		context.fillStyle = "#999";
		var boxWidth = canvas.width / numBoxes;
		var top = (canvas.height - boxWidth) / 2;
		// fill all current boxes
		for (var i = startPos; i <= endPos; i++) {
			context.fillRect(i * boxWidth, top, boxWidth, boxWidth);
		}

		context.fillStyle = "yellow";
		context.fillRect(midIdx * boxWidth, top, boxWidth, boxWidth);
	}

	function drawBoxes (canvas, context, numBoxes) {
		context.beginPath();
		var boxWidth = canvas.width / numBoxes;
		// top and bottom edges
		context.moveTo(0, (canvas.height + boxWidth) / 2);
		context.lineTo(canvas.width, (canvas.height + boxWidth) / 2);
		context.moveTo(0, (canvas.height - boxWidth) / 2);
		context.lineTo(canvas.width, (canvas.height - boxWidth) / 2);
		// inbetween each array element
		for (var i = 0; i <= numBoxes; i++) {
			context.moveTo(i * boxWidth, (canvas.height + boxWidth) / 2);
			context.lineTo(i * boxWidth, (canvas.height - boxWidth) / 2);
		}
		context.closePath();
		context.stroke();
	}

	function fillBoxes (canvas, context, arr) {
		context.fillStyle = "#000";
		var boxWidth = canvas.width / arr.length;
		context.font = "bold " + boxWidth / 2 + "px sans-serif";
		context.textAlign = "center";
		var height = canvas.height / 2 + boxWidth / 4;
		for (var i = 0; i < arr.length; i++) {
			context.fillText(arr[i], (i + 1 / 2) * boxWidth, height) ;
		}
	}

	BSarray.prototype.fillDivs = function (stepResult) {
		$('#search-area').html("Search narrowed to " + (this.endPos - this.startPos + 1) + " elements from startIdx " + this.startPos + " to endIdx " + this.endPos + ".");
		$('#checking-el').html("Currently checking element at index " + this.midIdx + ".");

		$result = $('#result');
		if (stepResult === null) {
			$result.html("Result: Still looking");
		} else if (stepResult == -1) {
			$result.html("Result: Item not found");
		} else {
			$result.html("Result: Target found at index " + this.midIdx + ".");
		}
	};
});
