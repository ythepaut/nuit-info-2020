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
server.listen(process.env.PORT, () => {
    console.log(`Server is now listening on port ${process.env.PORT}...`);
});

app.use(express.urlencoded({extended: true}));
app.use("/", express.static(__dirname + "/static"));
