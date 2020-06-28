const fetch = require('node-fetch')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const metadataController = require('./controllers/metadataController')

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/update', (req, res) => {
    let endpoint = "https://api.covid19tracker.ca/reports?fill_dates=true&after="
    let date = new Date()
    date.setDate(date.getDate() - 7)
    let formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    let uri = endpoint + formattedDate
    fetch(uri)
    .then(res => res.json())
    .then(json => {
        console.log(json)
        ratio = 0.001 // example purpose
        metadataController.changeScale(ratio)
    })
    res.send('Hello World!')
})

metadataController.changeScale(0.2)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
