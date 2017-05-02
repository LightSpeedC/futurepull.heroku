'use strict';

const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const serveIndex = require('serve-index');

app.use(express.static('./public'));
app.use(serveIndex('./public', {icons: true}));
app.listen(PORT, () => console.log('listening port: ', PORT));
