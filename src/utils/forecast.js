const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/8c923352d5dba5831593221e4f21fb98/' + latitude + ',' + longitude

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain. Hightest temperature was ' + body.daily.data[0].temperatureHigh + ' and the lowest temperature was ' + body.daily.data[0].temperatureLow + '.');            
        }
    })
}

module.exports = forecast
