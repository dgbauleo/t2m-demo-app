const express = require('express');
const parser = require('body-parser')
const request = require('request');
const app = express();
const port = 3000

app.set('view engine', 'ejs');

app.use(express.static('static'));
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

app.get('/', function(req, res){
    res.render('index', {
        cidade: null,
        lat: null,
        lng: null,
        temp: null
    })
});

app.post('/', function(req, res){
    let host = req.get('origin')

    let lat = req.body.lat;
    let lng = req.body.lng;

    request(`${host}/weather/${lat}/${lng}`, function(e,r,b){
        let data = null;

        if (!e && r.statusCode == 200) {
            data = JSON.parse(b);
        }

        res.render('index', {
            cidade: req.body.cidade,
            lat: lat,
            lng: lng,
            temp: data.main.temp
        });
    });
});

app.get('/weather/:lat/:lng', function(req, res){
    const lat = req.params.lat;
    const lng = req.params.lng;

    request(`http://api.openweathermap.org/data/2.5/weather?appid=e579ea1796edcda3e1615d7daec85017&units=metric&lat=${lat}&lon=${lng}`, function (e,r,b) {
        if (!e && r.statusCode == 200) {
            res.send(JSON.parse(b));
        }
    });
});

app.get('/songs/:style', function(req, res){
    res.send(req.params.style);
});

app.listen(port, function(){
    console.log(`Example app listening on port ${port}!`);
});