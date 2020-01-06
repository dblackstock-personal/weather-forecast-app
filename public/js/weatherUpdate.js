const searchBoxCity = document.getElementById('search-box-city')
const searchBoxCountry = document.getElementById('search-box-country')
const search = document.getElementById('submit')
const results = document.getElementsByClassName('results')
const city = document.getElementById('location')
const temperature = document.getElementById('temperature')
const weatherReadout = document.getElementById('weather')
const image = document.getElementById('weatherImage')

const weatherUpdate = () => {
    fetch(`http://localhost:2992/api/?city=${searchBoxCity.value}&country=${searchBoxCountry.value}`)
        .then((output) => {
            output.json().then((weatherObject) => {
                // console.log(weatherObject)
                
                for (let index = 0; index < results.length; index++) {
                    console.log('here')
                    results[index].style.display = 'block';
                }
                city.textContent = `${weatherObject.city}, ${weatherObject.country}`
                weatherReadout.textContent = weatherObject.weather
                temperature.textContent = `${weatherObject.temperature}°C`
                console.log(weatherObject)
                image.src = `http://openweathermap.org/img/wn/${weatherObject.icon}@2x.png`
            })
        })
}

search.addEventListener("click",weatherUpdate)

//this is a mess.

    // const reader = response.body.getReader();
    // reader.read()
    // .then(({done,value}) => {
    //     if (done) {
    //         reader.releaseLock
    //     }
    //     console.log(value)
    // })
    // console.log(responseObject.body)

// app.get('/', async (req, res) => {
//     let weather = await rp('./app')
//     console.log(weather)
// })