const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 3420;
const host = process.env.HOST || '0.0.0.0';
const api = require('./routes/api');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', express.static(__dirname));
app.use('/api', api);
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'))
});

const server = app.listen(port, host, function () {
	const host = server.address().address = '0.0.0.0' ? 'localhost' : server.address().address;
	const port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});

