const { response } = require("express");
const express = require("express");
const https = require("https");

const app = express();

app.get("/", function (req, res) {
    const url = " https://api.openweathermap.org/data/2.5/weather?q=faridabad&appid=78320d74cc10fc9f7d9202a192f70b5b&units=metric";
    https.get(url, function (response) {


        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The tempreature of faridabad is " + temp + "</h1>");
            res.write("<p>The weather is currently " + description + "." + "</p>");
            res.write("<img src=" + imageURL + ">")
            res.send();
        });
    });
});

app.listen(3000);