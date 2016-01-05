define('forest', ['jquery', 'array2d'], function($, a2d) {
	
	function Forest(width, height, density) {
		var State = {
			DEAD: 0,
			ALIVE: 1,
			BURNING: 2
		};
		
		var Render = {
			0: 'dead',
			1: 'alive',
			2: 'burning'
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
			/*for (var i = x-1; i <= x+1; ++i) {
				for (var j = y-1; j <= y+1; ++j) {
					if (i >= 0 && i < width && j >= 0 && j < height) {
						if (c.get(i, j) == State.BURNING) return true;
					}
				}
			}*/
			
			try { if (c.get(x-1, y) == State.BURNING) return true; } catch (err) {};
			try { if (c.get(x+1, y) == State.BURNING) return true; } catch (err) {};
			try { if (c.get(x, y-1) == State.BURNING) return true; } catch (err) {};
			try { if (c.get(x, y+1) == State.BURNING) return true; } catch (err) {};
			
			return false;
		};
		
		this.step = function() {
			console.log("* step *");
			
			var change = false;
			var old_cells = cells.clone();
			old_cells.forEach(function(v, x, y) {
				if (v == State.BURNING) {
					cells.set(x, y, State.DEAD);
					change = true;
				} else if (v == State.ALIVE) {
					if (checkNeighbours(old_cells, x, y)) {
						cells.set(x, y, State.BURNING);
						change = true;
					}
				}
			});
			
			return change;
		};
		
		this.ignite = function(x, y) {
			if (cells.get(x, y) == State.ALIVE) {
				cells.set(x, y, State.BURNING);
			}
		};
		
		this.render = function(el) {
			var table = $("<table/>");
			
			for (var y = 0; y < height; ++y) {
				var row = $(table[0].insertRow(-1));
				for (var x = 0; x < width; ++x) {
					var cell = $("<td/>");
					cell.html("&nbsp;");
					cell.addClass(Render[cells.get(x, y)]);
					row.append(cell);
				}
			}
			
			el.html("");
			el.append(table);
		};
		
		this.countAlive = function() {
			var alive = 0;
			cells.forEach(function(v, x, y) { if (v == State.ALIVE) ++ alive; });
			return alive;
		};
		
		this.alivePercentage = function() {
			var alive = 0;
			cells.forEach(function(v, x, y) { if (v == State.ALIVE) ++ alive; });
			return Math.round(100 * alive / (width * height));
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
