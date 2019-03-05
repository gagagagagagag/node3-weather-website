//NPM
const express = require("express");
const chalk = require("chalk");
const hbs = require("hbs");

//Core
const path = require("path");

//Files
const forecast = require("./utils/forecast.js");
const geocode = require("./utils/geocode.js");

const app = express();


//Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Set up handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static dir to serve
app.use(express.static(publicDirPath));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Jakub Przywara"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Jakub Przywara"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Jakub Przywara",
        helpText: "No one will help you dumbass."
    });
});


app.get("/weather", (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "An address must be provided!"
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=> {
        if (!error){
            forecast(latitude, longitude, (error, forecastData)=>{
                if (error){
                    return res.send({
                        error
                    });
                }

                res.send({
                    address: req.query.address,
                    forecastData,
                    location
                });

                console.log("Location: ", location); 
                console.log("Data: ", forecastData);
            })
        } else {
            return res.send({
                error
            });
        }
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search){
        res.send({
            errorMessage: "You must provide a search term"
        });
        return;
    }

    console.log(req.query);
    res.send({
        products: []
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Help article not found.",
        name: "Jakub Przywara"
    });
});

//404
app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Page not found.",
        name: "Jakub Przywara"
    });
});

app.listen(3000, () => {
    console.log(chalk.green("\nServer is up on port 3000."));
});