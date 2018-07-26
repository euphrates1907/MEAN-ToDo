var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./src/server/routes');

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

routes(app);

/* First parameter is every routes will trigger this function */
app.all('/*', function (req, res) {
    res.send(
        '<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
        '<title>MEAN ToDo App</title>' +
        // Location provider  needs this line
        '<base href="/">' +
        '</head>' +
        '<body>' +
        '<div ui-view></div>' +
        '<script src="bundle.js"></script>' +
        '</body>' +
        '</html>'
    );

});

app.listen(PORT, function () {
    console.log('Server running on ' + PORT);
});