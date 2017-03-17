define('forest', ['jquery', 'array2d'], function($, a2d) {
	
	function Forest(width, height, density) {
    
    /* states of the cells */
		var State = {
			DEAD: 0,
			ALIVE: 1,
			BURNING: 2
		};
		
    
    /* colors of the cell states */
		var Colors = {
			0: '#000000',   // dead
			1: '#00ff00',   // alive
			2: '#ff0000'    // burning
		};
		
    
		var width = width;
		var height = height;
		var cells = new a2d.Array2d(width, height);
		
    
    /* returns the width of the forest */
		this.getWidth = function() { return width; };
    
    
    /* returns the height of the forest */
		this.getHeight = function() { return height; };
		
    
    /* clears the forest */
		this.clear = function() {
			cells.forEach(function(v, x, y) { cells.set(x, y, State.DEAD); });
		};
		
    
    /* generates a new forest */
		this.randomize = function(density) {
			cells.forEach(function(v, x, y) { cells.set(x, y, Math.random() < density ? State.ALIVE : State.DEAD); });
		};
		
    
    /* prints out the cell states */
		this.print = function() {
			cells.print();
		};
		
    
    /* check if any neighbouring tree is burning */
		var checkNeighbours = function(c, x, y) {
			
			try { if (c.get(x-1, y) == State.BURNING) return true; } catch (err) {};
			try { if (c.get(x+1, y) == State.BURNING) return true; } catch (err) {};
			try { if (c.get(x, y-1) == State.BURNING) return true; } catch (err) {};
			try { if (c.get(x, y+1) == State.BURNING) return true; } catch (err) {};
			
			return false;
		};
		
    
    /* computes the burning automaton step */
		this.step = function() {
			
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
		
    
    /* sets the tree at (x, y) on fire if it's alive */
		this.ignite = function(x, y) {
			if (cells.get(x, y) == State.ALIVE) {
				cells.set(x, y, State.BURNING);
			}
		};
		
    
    /* renders the forest on canvas */
		this.render = function(canvas) {
			/*var table = $("<table/>");
			
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
			el.append(table);*/
      
      var dx = canvas.getAttribute('width') / width;
      var dy = canvas.getAttribute('height') / height;
      var ctx = canvas.getContext('2d');
      
      for (var x = 0; x < width; ++x) { 
        for (var y = 0; y < height; ++y) {
          ctx.fillStyle =  Colors[cells.get(x, y)];
          ctx.fillRect(x * dx, y * dy, dx, dy);
        }
      }
		};
		
    
    /* counts the trees alive */
		this.countAlive = function() {
			var alive = 0;
			cells.forEach(function(v, x, y) { if (v == State.ALIVE) ++ alive; });
			return alive;
		};
		
    
    /* counts how many of the tiles contain living trees as percentage */
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
