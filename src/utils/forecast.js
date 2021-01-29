const request = require('postman-request');

const forecast = (lattitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=a6ad20f492e40750bc991da508bc5501&query=" + lattitude + "," + longitude;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to the weather services", undefined);
        } else if (body.error) {
            callback("Invalid location", undefined);
        } else {
            const data = {
                place_name: body.location.name + ", " + body.location.region,
                temperature: body.current.temperature,
                weather: body.current.weather_descriptions[0]
            }
            let weatherInfo = "In " + data.place_name + ", it is currently " + data.temperature + "°C and " + data.weather;
            callback(error, weatherInfo)
        }
    })
}

module.exports = forecast;