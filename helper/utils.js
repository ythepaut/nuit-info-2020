module.exports = class {

    /**
     * Effectue une requete GET HTTPS
     * @param {Object}              https       Module HTTPS
     * @param {string}              url         URL de la requete
     * @param {string}              host        Hôte de la requete
     * @param {function}            callback    Fonction de callback
     */
    static httpsRequest(https, host, url, callback) {
        https.request(
            {
                host: host,
                path: encodeURI(url),
                port: 443,
                method: "GET"
            },
            (message) => {
                message.setEncoding("utf8");
                let data = "";
                message.on("data", (chunk) => {
                    data += chunk
                });
                message.on("end", () => {
                    callback(data);
                });
            }
        ).end();
    }


    /**
     * Retourne les coordonées d'une ville
     * @param {Object}              https       Module HTTPS
     * @param {string}              city        Ville
     * @param {function}            callback    Fonction de callback
     */
    static getCoordinates(https, city, callback) {
        this.httpsRequest(https, "api-adresse.data.gouv.fr", "http://api-adresse.data.gouv.fr/search/?q=" + city, (data) => {
            try {
                callback(JSON.parse(data).features[0].geometry.coordinates);
            } catch (e) {
                callback(null); //FIXME Erreur 503 lorsque l'on effectue beaucoup de requêtes en même temps
            }
        });
    }

}
