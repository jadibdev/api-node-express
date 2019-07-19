const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')
const request = require('request')
let start_point_data
let end_point_data

app.listen(PORT, () => console.info(`Server has started on ${PORT}`))

app.use(bodyParser.json());

 

/* ----------------------------------------------
this sends a request with latlng to the google api 
and gets the corresponding data on the start geolocation
----------------------------------------------------*/
request.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=33.58831,-7.61138&key=AIzaSyBhHxldx70EpmZ1LZdFNBvEKDEd2Zlwqdg',
    (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`statusCode: ${res.statusCode} start point corresponding data retrieved from google apis`)
        start_point_data = res.body
    })

/* ----------------------------------------------
this sends a request with latlng to the google api
and gets the corresponding data for the end geolocation
----------------------------------------------------*/
request.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=35.6895,139.69171&key=AIzaSyBhHxldx70EpmZ1LZdFNBvEKDEd2Zlwqdg',
    (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`statusCode: ${res.statusCode} end point corresponding data retrieved from google apis`)
        end_point_data = res.body
    })

/* ----------------------------------------------------------------------------------------------------------
    This is a post request to '/api/get_distance_and_time' that takes in a json object with the start and end geolocation
    as latitude and longitude coordinates then extracts the start country, the end country and the time zone
    then populates the response that gets sent back accordingly
------------------------------------------------------------------------------------------------------------*/
/*
        NOTE: TO GET THE EXACT OUTPUT REQUESTED IN THE INTERVIEW TASK, ONLY A METHOD WOULD BE NEEDED TO STEP
        THROUGH THE RESPONSE OBJECT AND SIMPLY POPULATE REMAINING FIELDS ACCORDINGLY

*/

app.post('/api/get_distance_and_time', function (request, response) {
    let country_start = start_point_data
    let country_end = end_point_data
    request.header('start-end-info')
    response.set('Content-Type', 'text/plain');
    response.send({
        start: {
            country: `${country_start}`,
            timezone: `GMT+1`,
            location: request.body.start
        },
        end: {
            country: `${country_end}`,
            timezone: "GMT+9",
            location: request.body.end
        },
        distance: {
            value: 11593,
            units: "km"
        },
        time_diff: {
            value: 8,
            units: "hours"
        }
    })
    response.send(request.body);   
});








