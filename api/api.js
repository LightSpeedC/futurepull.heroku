'use strict';

module.exports = function (context) {
	const router = require('express').Router();

	router.use('/books', require('./api-books')(context));

	return router;
};
