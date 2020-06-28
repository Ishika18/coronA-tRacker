const fetch = require('node-fetch')

metadataController = {
    changeScale: (ratio) => {
        let api = 'broken-recipe-8369'
        let entry = '93d0ce76-f38d-4138-9f52-0857aefe818d'
        let url = `https://console.echoAR.xyz/post?key=${api}&entry=${entry}&data=scale&value=${ratio}`
        fetch(url)
            .then(res => console.log(res))
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = metadataController