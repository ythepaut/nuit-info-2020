let http = require("http"),
    express = require("express"),
    path = require("path");
let app = express(),
    server = http.createServer(app);

// setting view engine
app.set("view engine", "ejs");

// setting routes
require("./helper/db")((client) => {
    new (require("./helper/service"))(app, express, path, client);
});

// starting server
server.listen(process.env.PORT || 80, () => {
    console.log(`Server is now listening on port ${process.env.PORT || 80}...`);
});
