requirejs.config({
	baseUrl: "scripts",
	paths: {
		"underscore": "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min",
		"jquery": "https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
	}
});

require(['app'], function(app) {
	app.start();
});
