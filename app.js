'use strict';
const express = require("express");
const app = express();
const yelp = require('yelp-fusion');
require('dotenv').config();
 
const client = yelp.client(process.env.API_KEY);


app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("home.ejs");
});

app.get("/result", function(req, res){
    let location = req.query.location; 
    let distance = req.query.distance;
    //distance needs to be meters and 40k is the max the yelp API accepts and 1609 is the conversion rate from miles to meters
    distance = Math.min(40000, distance * 1609);
    client.search({
        term:"Restaurants",
        location: location,
        limit: 50,
        radius: distance 
    }).then(response => {
        let businesses = response.jsonBody.businesses;
        let rand = Math.floor(Math.random() * businesses.length);
        let restaurant = businesses[rand];
        res.render("result.ejs", {restaurant: restaurant});  
    }).catch(e => {
        console.log(e);
        res.render("error.ejs");
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});