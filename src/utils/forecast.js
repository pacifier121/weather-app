const request = require('postman-request');

const forecast = (lattitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=6d8ef9f3cbe759185b3a12e6f2a6b9f2&query=" + lattitude + "," + longitude;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to the weather services", undefined);
        } else if (body.error) {
            callback("Invalid location", undefined);
        } else {
            const data = {
                lattitude: lattitude,
                longitude: longitude,
                place_name: body.location.name + ", " + body.location.region,
                temperature: body.current.temperature,
                weather: body.current.weather_descriptions[0],
                humidity: body.current.humidity,
                weather_icon: body.current.weather_icons[0],
                localtime: body.location.localtime
            }
            callback(error, data)
        }
    })
}

module.exports = forecast;