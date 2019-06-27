const request = require("request")

const getGeoCode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1Ijoid2hpdGVrZXlzYW5kYmxhY2tjb2ZmZWUiLCJhIjoiY2p4N2JiMzJnMDhvODQwcGwycmpkcHI0dCJ9.3soJnzb1CpTyX-lNkFdu3A`

    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback(`Es besteht keine Verbindung zum Netzwerk!`, undefined)
        } else if (body.features.length === 0) {
            callback(`Der Ort ${location} ist nicht bekannt!`, undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                placeName: body.features[0].place_name
            })
        }
    })
}

module.exports = getGeoCode