define('forest', ['array2d'], function(a2d) {
	
	function Forest(width, height, density) {
		var State = {
			DEAD: 0,
			ALIVE: 1,
			BURNING: 2
		};
		
		var width = width;
		var height = height;
		var cells = new a2d.Array2d(width, height);
		
		this.getWidth = function() { return width; };
		this.getHeight = function() { return height; };
		
		this.clear = function() {
			cells.forEach(function(v, x, y) { cells.set(x, y, State.DEAD); });
		};
		
		this.randomize = function(density) {
			cells.forEach(function(v, x, y) { cells.set(x, y, Math.random() < density ? State.ALIVE : State.DEAD); });
		};
		
		this.print = function() {
			cells.print();
		};
		
		var checkNeighbours = function(c, x, y) {
			for (var i = x-1; i <= x+1; ++i) {
				for (var j = y-1; j <= y+1; ++j) {
					if (i >= 0 && i < width && j >= 0 && j < height) {
						if (c.get(i, j) == State.BURNING) return true;
					}
				}
			}
			
			return false;
		};
		
		this.step = function() {
			console.log("* step *");
			
			var old_cells = cells.clone();
			old_cells.forEach(function(v, x, y) {
				if (v == State.BURNING) {
					cells.set(x, y, State.DEAD);
				} else if (v == State.ALIVE) {
					if (checkNeighbours(old_cells, x, y)) {
						cells.set(x, y, State.BURNING);
					}
				}
			});
		};
		
		this.ignite = function(x, y) {
			if (cells.get(x, y) == State.ALIVE) {
				cells.set(x, y, State.BURNING);
			}
		};
		
		if (typeof(density) === "undefined") {
			this.clear();
		} else {
			this.randomize(density);
		};
	}
	
	return {
		Forest: Forest
	}
	
});
