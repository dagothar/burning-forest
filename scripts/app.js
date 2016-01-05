define('app', ['forest'], function(forest) {
	
	function start() {
		
		var f = new forest.Forest(10, 5, 0.6);
		f.print();
	}
	
	return {
		start: start
	}
});
