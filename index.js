const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.info(`Server has started on ${PORT}`))

app.get('/', (req, res) => {
    res.send('home requested')
})

app.get('/api', (req, res) => {
    res.send('api requested')
})
const googleMapsClient = require('@google/maps').createClient({
    key: 'USE_YOUR_API_KEY'
})

app.get('/api/get_distance_and_time', (req, res) => {
    res.send('get_distance_and_time is requested')
})

googleMapsClient.distanceMatrix({
    origins: [
        'Greenwich, Greater London, UK',
    ],
    destinations: [
        'Stockholm County, Sweden',
    ]
}, (err, res) => {
    if (!err) {
        console.log(res.json.rows[0].elements)
    } else {
        console.log('Error: ', err)
    }
})




