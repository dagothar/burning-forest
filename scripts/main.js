requirejs.config({
	baseUrl: "scripts",
	paths: {
		"jquery": "https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
	}
});

require(['app'], function(app) {
	app.start();
});
