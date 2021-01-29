const request = require('postman-request');

const geocode = (place, callback) => {
    let url = "https://cors-anywhere.herokuapp.com/https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(place) + ".json?access_token=pk.eyJ1IjoicGFjaWZpZXIxMjEiLCJhIjoiY2trN2E3Mmk0MGMyMDJubXZ5aDE4ZmE0dCJ9.edddL0DzHyBjr2yLXBOnUg&limit=1";

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Sorry, not able to connect to the weather services", undefined);
        } else if (body.features.length === 0) {
            callback("Sorry, the location could not be found", undefined);
        } else {
            let data = {
                lattitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            };
            callback(error, data);
        }
    });
}




module.exports = geocode