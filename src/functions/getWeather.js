const request = require("request")

const getWeather = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/d47bf142d83a36918fc8457f0bd5224d/${latitude},${longitude}?units=si&lang=de`

    request({
            url,
            json: true
        },
        (error, {
            body
        }) => {
            if (error) {
                callback(`Es besteht keine Verbindung zum Netzwerk!`, undefined);
            } else if (body.error) {
                callback(body.error, undefined)
            } else {
                callback(undefined,
                    `${body.daily.data[0].summary} Es ist momentan ${body.currently.temperature} Grad mit einer Regenwahrscheinlichkeit von ${body.currently.precipProbability}%.`
                )
            }
        })
}

module.exports = getWeather