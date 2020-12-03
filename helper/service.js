module.exports = class {


    constructor(app, express, path) {
        this._app = app;
        this._express = express;
        this._path = path;
        this.initializeRoutes();
    }


    initializeRoutes() {

        // setting static folder
        this._app.use(this._express.static(this._path.join(__dirname, "../static")));

        // home route
        this._app.get("/", (req, res) => {
            res.render("index");
        });

        // user submit form
        this._app.post("/submit", (req, res) => {
            if (!req.body) return res.sendStatus(400);
            
            res.redirect("/");
        });

    }

}
