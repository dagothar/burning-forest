define('app', ['jquery', 'forest'], function($, _forest) {
	
  
  /* starts the application */
	function start() {
    
    var initialTrees = 0;
		
    /* updates the board */
		var updateView = function(f) {
			f.render($(".board").get(0));
      $(".initial-trees-alive").text(initialTrees);
			$(".trees-alive").text(f.countAlive());
      $(".trees-alive-percentage").text(Math.round(100.0 * f.countAlive() / initialTrees) + '%');
		};
    
    
    /* generates new map */
    var generateMap = function() {
      var f = new _forest.Forest(100, 100, $("#density").val());
      initialTrees = f.countAlive();
      return f;
    };
    
		
		var forest = generateMap();
		updateView(forest);
		
		var stepTimer;
		
    
    /* computes step */
		var makeStep = function() {
			var change = forest.step();
			updateView(forest);
			
			if (!change) clearInterval(stepTimer);
		};
		
    
    /* resets the board */
		$("#reset").click(function(ev) {
			forest = generateMap();
			updateView(forest);
			ev.preventDefault();
		});
		
    
		/* starts the fire */
		$("#start").click(function(ev) {
			for (var y = 0; y < forest.getHeight(); ++y) { forest.ignite(0, y); };
			updateView(forest);
			stepTimer = setInterval(makeStep, 100);
			ev.preventDefault();
		});
		
    
    /* stops the fire */
		$("#stop").click(function(ev) {
			clearInterval(stepTimer);
			ev.preventDefault();
		});
	}
	
  
	return {
		start: start
	}
});
