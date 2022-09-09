const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
     
   res.sendFile(__dirname + "/index.html");
     
});

app.post("/", function(req, res){
   
    const query = req.body.cityName;
    const apiKey = "c23b15588031e51befdb2a07c3f17482";
    const unit = "metric"

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey +"&units="+ unit;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
         const weatherData = JSON.parse(data)
         const temp = weatherData.main.temp
         const weatherDescription = weatherData.weather[0].description
         const icon = weatherData.weather[0].icon
         const imageURL = 
         res.write("<p>The Weather is currently" + weatherDescription + "<p>");
         res.write("<h1>the temperature in" + query  + " is" + temp + "degree,celcious</h1>");
         res.send();
       });
});

       
});







app.listen(5000, function(){
     console.log("server started in 5000");
});