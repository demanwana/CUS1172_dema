const express = require('express');
const app = express();

const api_routes = require('./api_routes_dev');


app.use('/api', api_routes);


app.use('/demo', express.static('front_end'));


if (require.main === module) {
    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
}

module.exports = app;
