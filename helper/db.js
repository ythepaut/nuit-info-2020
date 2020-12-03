module.exports = (callback) => {

    const MongoClient = require("mongodb").MongoClient;

    MongoClient.connect(
        `mongodb://NuitInfo:${process.env.DB_PASSWORD}@localhost:27017/NuitInfo`,
        {useUnifiedTopology : true},
        (err, client) => {
            if (err) {
                console.log("Erreur de connexion à la base :");
                console.log(err);
                callback(null);
            } else {
                callback(client.db("NuitInfo"));
            }
        }
    );
}
