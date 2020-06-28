const fetch = require('node-fetch')

metadataController = {
    changeScale: (ratio) => {
        let api = '<API KEY>'
        let entry = '<ENTRY_KEY>'
        let url = `https://console.echoAR.xyz/post?key=${api}&entry=${entry}&data=scale&value=${ratio}`
        fetch(url)
    },

    changeText: (newText) => {
        let key = "<API KEY>"
        let endpoint = "https://console.echoar.xyz/post?key=" + key + "&entry=<ENTRY_KEY>&data=text&value="
        let updateText = newText
        fetch(endpoint+updateText)
    },

    changeColor: (newColor) => {
        let api = '<API KEY>'
        let entry = '<ENTRY_KEY>'
        let url = `https://console.echoAR.xyz/post?key=${api}&entry=${entry}&data=textColor&value=${ratio}`
        fetch(url)
    }
}

module.exports = metadataController