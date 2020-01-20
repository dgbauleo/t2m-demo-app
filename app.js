const express = require("express");
const parser = require("body-parser")
const request = require("request");
const app = express();
const port = 3000

app.set("view engine", "ejs");

app.use(express.static("static"));
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

app.get("/", function(req, res){
    res.render("index", {
        cidade: null,
        lat: null,
        lng: null,
        temp: null,
        genre: null,
        tracks: null
    })
});

app.post("/", function(req, res){
    let host = req.get("origin")

    let lat = req.body.lat;
    let lng = req.body.lng;

    request(`${host}/weather/${lat}/${lng}`, function(e,r,b){
        let data = null;

        if (!e && r.statusCode == 200) {
            data = JSON.parse(b);
        }

        let temp = data.main.temp;

        let genre = null;

        if (temp < 10) genre = "classical"
        else if (temp >= 10 && temp <= 25) genre = "rock"
        else genre = "pop"

        request(`${host}/tracks/${genre}`, function(e,r,b){
            res.render("index", {
                cidade: req.body.cidade,
                lat: lat,
                lng: lng,
                temp: temp,
                genre: genre.toUpperCase(),
                tracks: JSON.parse(b).tracks
            });
        });
    });
});

app.get("/weather/:lat/:lng", function(req, res){
    const lat = req.params.lat;
    const lng = req.params.lng;

    request(`http://api.openweathermap.org/data/2.5/weather?appid=e579ea1796edcda3e1615d7daec85017&units=metric&lat=${lat}&lon=${lng}`, function (e,r,b) {
        if (!e && r.statusCode == 200) {
            res.send(JSON.parse(b));
        } else {
            res.send({"error": "Could not fetch data."});
        }
    });
});

app.get("/tracks/:genre", function(req, res){
    let genres = [
        { "id": "g.5",      "name": "rock" },
        { "id": "g.21",     "name": "classical" },
        { "id": "g.115",    "name": "pop" }
    ];
    
    let genre = genres.find(g => g.name == req.params.genre);

    if (genre != null) {
        request(`http://api.napster.com/v2.2/genres/${genre.id}/tracks/top?apikey=ZWQ5MDM0ZmEtZTk0Ni00YzQ4LTllY2YtMDU2MzAyOWYxNmIx`, function (e,r,b) {
            if (!e && r.statusCode == 200) {
                res.send(JSON.parse(b));
            } else {
                res.send({"error": "Could not fetch data."});
            }
        });
    } else {
        res.send({"error": "Genre not available."});
    }
});

app.listen(port, function(){
    console.log(`App listening on port ${port}!`);
});