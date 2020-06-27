const fetch = require('node-fetch')
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/update', (req, res) => {
    let endpoint = "https://api.covid19tracker.ca/reports?fill_dates=true&after="
    let date = new Date()
    date.setDate(date.getDate() - 7)
    let formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    let uri = endpoint + formattedDate
    fetch(uri)
    .then(res => res.json())
    .then(json => console.log(json))
    res.send('Hello World!')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
