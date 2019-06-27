const path = require("path");
const express = require("express");
const hbs = require("hbs");
const getGeoCode = require("./functions/getGeoCode")
const getWeather = require("./functions/getWeather")

// Create Expressapplication
// generated bei calling express
const app = express()
// Manipulieren von Pfad mit Join
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// key --> value (hier: sagen, welche templating engine wir benutzen)
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Customize response
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Kerstin Simone Maier"
    })
})

// hier können wir sagen, was zu tun ist
// das erste Argument ist die Route also wo ist es
// das zweite Argument ist das was also was soll passieren, wenn User auf die Route geht:
// diese wiederum hast zwei Argumente:
// 1. req für request (enthält incoming request to the sever) und ist ein Object
// 2. res für response (enthält eine Menge Functions, um die Antwort zu costumizen, die
// wir zum Requester zurück senden)
// -----------------------------------
// app.get("", (req, res) => {
//     // response senden (HTML)
//     res.send("<h1>Weather</h1>")
// })
// -----------------------------------

// app.get("/help", (req, res) => {
//     // response senden (JSON)
//     res.send([{
//             name: "Kerstin",
//             age: 31
//         },
//         {
//             name: "Patrick",
//             age: 28
//         },
//         {
//             name: "Fiffi",
//             age: 0.8
//         }
//     ])
// })

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        message: "Here you can find help! <3",
        name: "Kerstin Simone Maier"
    })
})

// app.get("/about", (req, res) => {
//     res.send("<h1>About Me</h1>")
// })

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Kerstin Simone Maier"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send([{
            error: "Please provide an address!"
        }])
    }

    getGeoCode(req.query.address, (error, {
        latitude,
        longitude,
        placeName
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        getWeather(latitude, longitude, (error, weatherData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                weather: weatherData,
                location: placeName,
                input: req.query.address
            })
        })
    })
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        error: "Help article not found.",
        name: "Kerstin Simone Maier"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        error: "Page not found.",
        name: "Kerstin Simone Maier"
    })
})

// Server starten
// 1. Argument: Port
// 2. Callbackfunction
app.listen(3000, () => {
    console.log("Webserver is up on port 3000.")
})