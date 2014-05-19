var http = require('http');

var requestStr = JSON.stringify({
	article_id: 'cqKQInL6FufFuKN7'
});

var options = {
	hostname: '127.0.0.1',
	path: '/forwardArticle',
	method: 'POST',
	headers: {
		'Content-Length': Buffer.byteLength(requestStr, 'utf-8'),
		'Content-Type': 'application/json'
	}
};

var proxyReq = http.request(options, function(proxyRes) {
	var result = '';
	proxyRes.on('data', function(data) {
		result += data;
	});
	proxyRes.on('end', function(){
		console.log(result);
	});
});

proxyReq.end(requestStr);

proxyReq.on('error', function(err) {
	console.error(err);
});
