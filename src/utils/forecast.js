//NPM
const request = require("request");

const forecast = (lat, long, callback)=> {
    const url = "https://api.darksky.net/forecast/009f7d8ea01d003cfe6226aede86f843/" + lat + "," + long + "?units=si&exclude=minutely,hourly,alerts,flags";

    request({
        url,
        json: true
    }, (error, { body })=> {
        if (error){
            callback("There is no connection!", undefined);
        } else if (body.error){
            callback("There was an error while getting the data!");
        } else {
            const data = body.currently;
            callback(undefined, body.daily.data[0].summary + " It's currently " + data.temperature + " degrees out. There is a " + data.precipProbability + "% chance of rain.");
        }
    });
}

module.exports = forecast;