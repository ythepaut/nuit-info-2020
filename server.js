let http = require("http"),
    express = require("express"),
    path = require("path");
let app = express(),
    server = http.createServer(app);

// setting view engine
app.set("view engine", "ejs");

// setting routes
new (require("./helper/service"))(app, express, path);

// starting server
server.listen(process.env.PORT || 8000, () => {
    console.log("Server is now listening...");
});
