let http = require("http"),
    express = require("express"),
    path = require("path"),
    bodyParser = require('body-parser');
let app = express(),
    server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// setting view engine
app.set("view engine", "ejs");

// setting routes
new (require("./helper/service"))(app, express, path);

// starting server
server.listen(process.env.PORT || 80, () => {
    console.log(`Server is now listening on port ${process.env.PORT || 80}...`);
});
