$( function () {
	$("form").on("submit", function (event) {
		event.preventDefault();
		var data = $(event.target).serializeArray();
		$("#result").html(data);
		var inputArr = data[0].value.split(",");
		inputArr.forEach(function (curVal, idx, arr) {
			arr[idx] = parseInt(curVal);
		});
		var target = parseInt(data[1].value);

		var bsArray = new BSarray(inputArr, target);
		bsArray.fillDivs();
		bsArray.draw();
		$("#step").on("click", function (event) {
			var result = bsArray.step();
			bsArray.fillDivs(result);
			bsArray.draw();
		});
	});
});
