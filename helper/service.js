module.exports = class {


    constructor(app, express, path, db, _https) {
        this._app = app;
        this._express = express;
        this._path = path;
        this._db = db;
        this._https = _https;
        this._initializeRoutes();
        this._initializeAPIRoutes();
        this._utils = require("./utils");
    }

    _genericMapReduce(attribute, callback) {
        this._db.collection("sondage").mapReduce(
            function() {
                if (this[attribute] !== undefined && this[attribute] !== null)
                    emit(this[attribute], 1);
            },
            function(key, values) {
                return Array.sum(values);
            },
            {out: {inline: 1}},
            function(err, data) {
                callback(data);
            }
        );
    }


    _initializeAPIRoutes() {

        this._app.use("/api/genericsum/:attribute", (req, res) => {
            this._genericMapReduce(req.params.attribute, (data) => {
                res.send(JSON.stringify(data));
            });
        });

        this._app.use("/api/pollution", (req, res) => {
            this._db.collection("sondage").mapReduce(
                function() {
                    emit(this["city"], this["pollution_rate"]);
                },
                function(key, values) {
                    return Array.sum(values)/values.length;
                },
                {
                    out: {inline: 1}
                },
                function(err, data) {

                    let result = [];
                    for (let i in data) {
                        if (data[i]._id) {
                            this._utils.getCoordinates(this._https, data[i]._id, (coordinates) => {
                                result.push({_id : (coordinates != null) ? coordinates : [0,0]});
                                if (result.length === data.length) {
                                    res.send(JSON.stringify(result));
                                }
                            });
                        } else {
                            result.push({_id : [0,0], value: data[i].value});
                        }
                    }

                }
            );
        });

    }


    _initializeRoutes() {

        // setting static folder
        this._app.use(this._express.static(this._path.join(__dirname, "../static")));

        // home route
        this._app.get("/", (req, res) => {
            res.render("index");
        });

        // user submit form
        this._app.post("/submit", (req, res) => {
            if (!req.body) return res.sendStatus(400);

            // made to be sure that every field does exist and
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
