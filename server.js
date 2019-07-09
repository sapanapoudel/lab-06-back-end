'use strict'
// API Dependencies
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Globals
const PORT = process.env.PORT;

// Make the server
const app = express();
app.use(cors());

// Location Route
app.get('/location', (request, response) => {
  console.log(request.query.data);
  try {
    const locationData = searchToLatLng(request.query.data);
    response.send(locationData);
  }
  catch (e){
    response.status(500).send('Status 500, not functional.');
  }
});

// app.use('*', (request, response) => {
//   response.send('you got to the wrong place');
// });

Location(name, formatted, lat, lng) {
  this.search_query = name;
  this.formatted_query = formatted;
  this.latitude = lat;
  this.longitude = lng;
}


function searchToLatLng(locationName) {
  const geoData = require('./data/geo.json');
  const location = new Location(
    locationName,
    geoData.results[0].formatted_address,
    geoData.results[0].geometry.location.lat,
    geoData.results[0].geometry.location.lng
    );
  console.log(location);
  return location;
}

// Start the server.
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
