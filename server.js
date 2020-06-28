const fetch = require('node-fetch')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const metadataController = require('./controllers/metadataController')
const ejsLayouts = require('express-ejs-layouts');

app.use(ejsLayouts)
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    setInterval(function () {
        let endpoint = "https://api.covid19tracker.ca/reports?fill_dates=true&after="
        let date = new Date()
        date.setDate(date.getDate() - 7)
        let formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        let uri = endpoint + formattedDate
        fetch(uri)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                console.log(`active cases today: ${activeCases(json.data[json.data.length - 1])}`)
                console.log(`new cases today: ${json.data[json.data.length - 1].change_cases}`)
                let cases = 0
                for (let i = 0; i < json.data.length; i++) {
                    cases += activeCases(json.data[i])
                }
                cases /= json.data.length
                console.log(`average daily cases over the last week: ${cases}`)
                let updateText = `new cases today: ${json.data[json.data.length - 1].change_cases}; active cases today: ${activeCases(json.data[json.data.length - 1])}; average daily cases over the last week: ${cases}`
                metadataController.changeText(updateText)
                fetch(endpoint + updateText)

                let trend = activeCases(json.data[json.data.length - 1]) / cases
                ratio = 0.2 // base ratio
                metadataController.changeScale(ratio * trend)
            })
            .catch(err => {
                console.log(err)
            })
        function activeCases(summary) {
            let cases = summary.total_cases - summary.total_fatalities - summary.total_recoveries
            return cases
        }
    }, 86400000)
    res.render("trackers/home")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
