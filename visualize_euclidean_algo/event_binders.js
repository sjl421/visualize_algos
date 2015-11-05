$( function () {
	$("form").on("submit", function (event) {
		event.preventDefault();
		var data = $(event.target).serializeArray();
		var num1 = parseInt(data[0].value);
		var num2 = parseInt(data[1].value);

		var euclidGCD = new EuclidGCD(num1, num2);
		euclidGCD.fillDivs();
		euclidGCD.draw();
		$("#step").on("click", function (event) {
			euclidGCD.step();
			euclidGCD.fillDivs();
			euclidGCD.draw();
		});
	});
});
