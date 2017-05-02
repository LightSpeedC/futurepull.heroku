'use strict';

module.exports = function (context) {
	const router = require('express').Router();

	const books = context.books = {list: []};
	const reduceMaxId = (a, b) => Math.max(a, b.id);

	for (let id = 0; id < 1e3; ++id)
		books.list.push({id, name: 'books' + id});

	books.nextId = books.list.reduce(reduceMaxId, 0) + 1;

	const SIZE = 10;
	const NOT_FOUND = {code: 'NOT_FOUND',
			message: 'not found'};

	// GET /?offset=0&size=10
	router.get('/', (req, res) => {
		const offset = Number(req.query.offset || 0);
		const size = Number(req.query.size || SIZE);
		res.json({result: {list: books.list.slice(offset, offset + size), offset, size, length: books.list.length}});
	});

	// GET /:id
	router.get('/:id', (req, res) => {
		const pos = getIndex(Number(req.params.id));
		if (pos < 0) return res.json({error: NOT_FOUND});
		res.json({result: books.list[pos]});
	});

	// POST /
	router.post('/', (req, res) => {
		const elem = req.body;
		elem.id = books.nextId++;
		books.list.push(elem);
		res.json({result: elem});
	});

	// PUT /:id
	router.put('/:id', (req, res) => {
		const pos = getIndex(req.params.id);
		if (pos < 0) return res.json({error: NOT_FOUND});
		res.json({result: books.list.splice(pos, 1, req.body)});
	});

	// DELETE /:id
	router.delete('/:id', (req, res) => {
		const pos = getIndex(req.params.id);
		if (pos < 0) return res.json({error: NOT_FOUND});
		res.json({result: books.list.splice(pos, 1)});
	});

	// getIndex
	function getIndex(id) {
		id = Number(id);
		const len = books.list.length;
		for (let pos = 0; pos < len; ++pos)
			if (books.list[pos].id === id)
				return pos;
		return -1;
	}

	return router;
};
