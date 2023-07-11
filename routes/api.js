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

router.get('/twitch-users', async function (req, res, next) {
    // Get user IDs or login names from request query parameters
	const { id, login } = req.query;

    console.log(id, login)
    // Prepare URL for the Twitch API request
    let url = new URL('https://api.twitch.tv/helix/users');
	if (id) {
        // Check if id is an array or a singular value
        Array.isArray(id) ? id.forEach(i => url.searchParams.append('id', i)) : url.searchParams.append('id', id);
    }
    if (login) {
        // Check if login is an array or a singular value
        Array.isArray(login) ? login.forEach(l => url.searchParams.append('login', l)) : url.searchParams.append('login', login);
    }
	console.log(url);
    // Set up headers for the Twitch API request
    const headers = {
        'Client-Id':process.env.client_id,
        'Authorization':'Bearer ' + process.env.access_token
    };

    // Send the Twitch API request
    const response = await fetch(url, { headers });

    // Check if the Twitch API request was successful
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        return next(new Error(message));
    }

    // Get the Twitch API response data
    const twitchData = await response.json();

    // Send the Twitch data in the response
    res.send(twitchData);
});

module.exports = router;
