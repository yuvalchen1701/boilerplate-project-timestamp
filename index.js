// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get('/api/:date?', (req, res) => {
  const { date } = req.params;
  let parseDate;

  if(!date) { // Check if a date was provided
    parseDate = new Date(); // Use current date
  } else if(!isNaN(date)) {
    // If the date is a number (Unix timestamp), parse it as milliseconds
    parseDate = new Date(parseInt(date));
  } else {
    // Otherwise, try to parse it as a standard date string
    parseDate = new Date(date);
  }

  if(isNaN(parseDate.getTime())) {
    res.json({error: "Invalid Date"});
  } else {
    res.json({
      unix: parseDate.getTime(),
      utc: parseDate.toUTCString()
    });
  }
});
// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
