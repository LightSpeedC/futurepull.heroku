const PORT = process.env.PORT || 3000;
require('http').createServer(
	(req, res) => res.end('hello ' + req.method + ' ' + req.url)
)
.listen(PORT, () => console.log('listening port: ', PORT));
