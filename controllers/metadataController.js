const fetch = require('node-fetch')

metadataController = {
    changeScale: (ratio) => {
        let api = '<API KEY>'
        let entry = '93d0ce76-f38d-4138-9f52-0857aefe818d'
        let url = `https://console.echoAR.xyz/post?key=${api}&entry=${entry}&data=scale&value=${ratio}`
        fetch(url)
    },

    changeText: (newText) => {
        let key = "<API KEY>"
        let endpoint = "https://console.echoar.xyz/post?key=" + key + "&entry=e5772384-6b0f-4c79-a2fd-ee4b49ac427a&data=text&value="
        let updateText = newText
        fetch(endpoint+updateText)
    }
}

module.exports = metadataController