const request = require('request');
//I should use promisify to update our request callback to use a promise!
// const util = require('util');
const rp = require('request-promise');

//it's async which means it will return a promise
const forecast = async (city, country, units) => {
    const encodedCityName = encodeURIComponent(city);
    let weatherMapUrl;
    if (!country) {
        weatherMapUrl = `https://api.openweathermap.org/data/2.5/find?q=${encodedCityName}&units=${units}&APPID=6bd0c45c28b9246331d958a4a41528c0`
    } else {
        weatherMapUrl = `https://api.openweathermap.org/data/2.5/find?q=${encodedCityName},${country}&units=${units}&APPID=6bd0c45c28b9246331d958a4a41528c0`
    }
    let weatherResponse;

    weatherResponse = await rp(weatherMapUrl)
        .then((response) => {
            const responseObject = JSON.parse(response)
            // console.log(responseObject)
            if (responseObject.list[0] == undefined) {
                let error = 'The data provided was incorrect. Please check your location is correct before trying again.'
                console.log(error)
                return error
            } else {

                return responseObject;
            }
        })
        .catch(() => {
            let error = 'error - could not connect to the API service. Please try again later.'
            console.log(error)
            return error
            // return error;
        })
    return weatherResponse;
}

module.exports = forecast;