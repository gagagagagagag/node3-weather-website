//NPM
const request = require("request");

const geocode = (address, callback)=> {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiamFrdWJwcnp5d2FyYSIsImEiOiJjanN0aHhqdWgxOHNtNDRwaGNneXFtdXdyIn0.9lvDEuKFcLD94hbkPlIwHQ&limit=1";
    
    request({
        url,
        json: true
    },(error, { body })=>{
        if (error || body.features.length == 0 || body.message){
            callback("Unable to get geocoding!", undefined);
        } else {
            const data = body.features[0];
            const latitude = data.center[1];
            const longitude = data.center[0];
            callback(undefined, {
                latitude,
                longitude,
                location: data.place_name
            });
        }
    })
};

module.exports = geocode;