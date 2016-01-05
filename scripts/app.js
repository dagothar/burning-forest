define('app', ['jquery', 'forest'], function($, _forest) {
	
	function start() {
		
		var updateView = function(f) {
			f.render($("#forest"));
			$("#trees").val(f.alivePercentage() + '%');
		};
		
		var forest = new _forest.Forest(80, 25, $("#density").val());		
		updateView(forest);
		
		var stepTimer;
		
		var makeStep = function() {
			var change = forest.step();
			updateView(forest);
			
			if (!change) clearInterval(stepTimer);
		};
		
		$("#reset").click(function(ev) {
			forest = new _forest.Forest(80, 25, $("#density").val());
			updateView(forest);
			ev.preventDefault();
		});
		
		$("#fire").click(function(ev) {
			for (var y = 0; y < forest.getHeight(); ++y) { forest.ignite(0, y); };
			updateView(forest);
			ev.preventDefault();
		});
		
		$("#step").click(function(ev) {
			makeStep();
			ev.preventDefault();
		});
		
		$("#start").click(function(ev) {
			for (var y = 0; y < forest.getHeight(); ++y) { forest.ignite(0, y); };
			updateView(forest);
			stepTimer = setInterval(makeStep, 100);
			ev.preventDefault();
		});
		
		$("#stop").click(function(ev) {
			clearInterval(stepTimer);
			ev.preventDefault();
		});
	}
	
	return {
		start: start
	}
});
