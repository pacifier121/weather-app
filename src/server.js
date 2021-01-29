const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const cors = require('cors');

const app = express();

app.use(cors());

const publicDirectory = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials')
const viewsPath = path.join(__dirname, '../templates/views');

app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectory));

app.get("", (req, res) => {
    res.render("index", {});
});


app.get("/help", (req, res) => {
    res.send("This is a help page");
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "Weather app",
        name: "Pacifier"
    })
});

app.get("/weather", (req, res) => {
    let place = req.query.city;
    if (!place) {
        return res.send({
            error: "Please provide a city name"
        })
    }
    geocode(place, (error, data) => {
        if (error) {
            return res.send({
                error: error
            });
        }
        forecast(data.lattitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                });
            }
            res.send(forecastData);
        });
    });
});

app.get("/products", (req, res) => {
    if (!req.query.product) {
        return res.send({
            error: "Please provide a search term"
        })
    }
    res.send({
        products: req.query.product
    })

})


//Custom 404 page
app.get("*", (req, res) => {
    res.render("page404");
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server started successfully on port number " + port);
});