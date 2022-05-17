const express = require('express');
const router = express.Router();
const fs = require("fs");
require('dotenv').config();

function getConfig(filepath) {
	let file = fs.readFileSync(filepath);
	return JSON.parse(file);
}

router.get('/json', function (req, res, next) {
	let data = getConfig(process.env.SELLIFY_JSON_PATH);

	res.send(data);
});

module.exports = router;
