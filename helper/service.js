module.exports = class {


    constructor(app, express, path, db) {
        this._app = app;
        this._express = express;
        this._path = path;
        this._db = db;
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

            // made to be sure that every fiel does exist and
            // aren't modified by client.
            if (req.body.lastName &&
                req.body.firstName &&
                req.body.city &&
                req.body.spot &&
                req.body.date &&
                req.body.start &&
                req.body.end &&
                req.body.swimmerNumber &&
                req.body.practitionerNumber &&
                req.body.boatNumber &&
                req.body.pollutionNumber &&
                req.body.pollutionText) {

                // database document
                var doc = {
                    last_name: req.body.lastName,
                    first_name: req.body.firstName,
                    city: req.body.city,
                    spot: req.body.spot,
                    date: req.body.date,
                    time_start: req.body.start,
                    time_end: req.body.end,
                    nb_swimmers: req.body.swimmerNumber,
                    nb_participants_activities: req.body.practitionerNumber,
                    nb_boats: req.body.boatNumber,
                    pollution_rate: req.body.pollutionNumber,
                    pollution_desc: req.body.pollutionText
                }

                // sending the insertion request
                this._db.collection("sondage").insertOne(doc, function(err, res) {
                    if(err) throw err;
                    console.log("Data inserted");
                });
            } else {
                console.log("Form incomplete");
            }
            res.redirect("/");
        });

    }

}
