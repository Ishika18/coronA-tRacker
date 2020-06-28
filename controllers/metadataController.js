const fetch = require('node-fetch')

metadataController = {
    changeScale: (ratio) => {
        let api = 'broken-recipe-8369'
        let entry = 'c045e2a6-9629-409c-b0c6-9c8cd86119e1'
        let url = `https://console.echoAR.xyz/post?key=${api}&entry=${entry}&data=scale&value=${ratio}`
        fetch(url)
    },

    changeText: (newText) => {
        let key = "broken-recipe-8369"
        let entry = 'c045e2a6-9629-409c-b0c6-9c8cd86119e1'
        let endpoint = `https://console.echoar.xyz/post?key=${key}&entry=${entry}&data=text&value=`
        let updateText = newText
        fetch(endpoint+updateText)
    },

    changeColor: (newColor) => {
        let api = 'broken-recipe-8369'
        let entry = 'c045e2a6-9629-409c-b0c6-9c8cd86119e1'
        let url = `https://console.echoAR.xyz/post?key=${api}&entry=${entry}&data=textColor&value=${newColor}`
        fetch(url)
    }
}

module.exports = metadataController