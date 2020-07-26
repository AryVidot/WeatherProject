const express = require("express");
const https = require("https");
const BodyParser = require("body-parser"); //body parser module
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const apiKey = "26a11dfa899cf62cf9f65d7350214a2f";
  const query = req.body.cityName;
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" +
    units +
    "&appid=" +
    apiKey;

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;

      //Display Icon image
      const iconCode = weatherData.weather[0].icon;
      const iconURL =
        "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";

      res.write("<p>The weather is currently " + weatherDesc + "</p>");
      res.write(
        "<h1>The temperature in " +
          query +
          " is " +
          temp +
          " degre celcius.</h1>"
      );
      res.write("<img src=" + iconURL + ">");

      res.send();

      console.log(weatherDesc);
    });
  });

  //   console.log("Post request recieved.");
});

// listen on port 3000 with the callback function
app.listen(3000, function () {
  console.log("server is running pn port 3000.");
});
