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
        console.log(`active cases today: ${activeCases(json.data[json.data.length -1])}`)
        console.log(`new cases today: ${json.data[json.data.length -1].change_cases}`)
        let cases = 0
        for(let i = 0; i<json.data.length; i++){
            cases += activeCases(json.data[i])
        }
        cases /= json.data.length + 1
        console.log(`average daily cases over the last week: ${cases}`)
        let key = "YOUR_KEY_HERE"
        let endpoint = "https://console.echoar.xyz/post?key=" + key + "&entry=e5772384-6b0f-4c79-a2fd-ee4b49ac427a&data=text&value="
        let updateText = `new cases today: ${json.data[json.data.length -1].change_cases}; active cases today: ${activeCases(json.data[json.data.length -1])}; average daily cases over the last week: ${cases}`
        fetch(endpoint+updateText)
        
        let trend = activeCases(json.data[json.data.length -1])/cases
        ratio = 0.001 // example purpose
        metadataController.changeScale(ratio)
    })

    function activeCases(summary){
        let cases = summary.total_cases - summary.total_fatalities - summary.total_recoveries
        return cases
    }
    res.send('Hello World!')
})

metadataController.changeScale(0.2)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
