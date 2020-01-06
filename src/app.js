const express = require('express');
const path = require('path');
const hbs = require('hbs');
const weather = require('./weatherMap.js')

//this is convention but I guess it's not actually needed, we could just refer to express directly
const app = express();

//this is a requirement for the static pages like index.html. It's also needed for where the CSS is
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectory))

//this makes hbs our view engine
app.set('view engine', 'hbs');
//this overwrites the default views folder for hbs and puts it within the viewsPath we defined above
//I've left the old views folder intact just for reference
app.set('views', viewsPath);

//we don't need this any more, it's within the about.html
// app.get('/about', (req,res) => {
//     res.send('Welcome to ABOUT')
// })

//
// const getCurrentWeather = async() => {
//     //this waits until the forecast promise is resolved

//     //...and then it logs the current weather
//     return currentWeather.list[0].weather[0].description
// }

// let weatherDataForPlace = getCurrentWeather();

// const currentWeather = weather('aberdeen','uk','metric');



//the one we use with handlebars is res.render, seen below
// app.get('/', async (req, res) => {
//     let currentWeather = await weather('cambridge', 'uk', 'metric')
//     if (typeof currentWeather == 'string') {
//         res.render('index', {
//             title: currentWeather,
//             author: 'Davey Blackstock'
//         })
//     } else {
//         res.render('index', {
//             title: 'Weather App',
//             author: 'Davey Blackstock',
//             location: currentWeather.list[0].name,
//             weather: currentWeather.list[0].weather[0].description
//         })
//     }
// }
// )

app.get('/', (req, res) => {
    res.render('index',{}

    )
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About This',
        subheading: 'Welcome to the weather query service! Enter the city you want to see the weather of.',
        otherInfo: 'Country will be chosen automatically unless you specify it. Country must be entered as a two character code e.g. RU for Russia, ZW for Zimbabwe and EG for Egypt'
    })
})

app.get('/contact', (req, res) => {
    res.send('<h1>Welcome to CONTACT</h1>')
})


//this is an api! You connect to the url and it spits out some JSON, just like the other apis from the internet
app.get('/api', async (req, res) => {
    console.log(req.query)

    if(!req.query.city){
        res.send({
            city: 'no city specified'
        })
    } else {
    let currentWeather = await weather(req.query.city, req.query.country, 'metric')
    if (typeof currentWeather == 'string') {
        res.send({
            city: currentWeather
        })
    } else {
        console.log(currentWeather.list[0])
        res.send(
            {
                city: currentWeather.list[0].name,
                country: currentWeather.list[0].sys.country,
                temperature: currentWeather.list[0].main.temp,
                weather: currentWeather.list[0].weather[0].description,
                icon: currentWeather.list[0].weather[0].icon
            }
        )
    }
}
})

//this sends this response to all remaining pages, covering our bases
app.get('*', (req, res) => {
    res.send('404-page not found')
});

//this is just here so we can check out these great global variables
// console.log(__dirname);
// console.log(__filename);

app.listen(2992, () => {
    console.log(`server's running`)
})