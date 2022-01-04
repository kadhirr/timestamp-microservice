
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204


app.use(express.static('public'));


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", function (req, res) {
  let reqDate = new Date();
  let resObj = {unix: reqDate.getTime(), utc: reqDate.toUTCString()};
  res.json(resObj);
});

// Check if date is null, then initialize with current date. If date is a number, use parseInt()
// else we are using a date string. Create object with required data, and send using res.json()

app.get("/api/:date", function(req, res){
  console.log(req.params);

  let reqDate;
  if(!isNaN(req.params.date)){
    reqDate = new Date(parseInt(req.params.date));
    let resObj = {unix: reqDate.getTime(), utc: reqDate.toUTCString()};
    res.json(resObj);
  }
  else{
    reqDate = new Date(req.params.date);
    if(reqDate == "Invalid Date")
      res.json({error: "Invalid Date"});
    else{
      let resObj = {unix: reqDate.getTime(), utc: reqDate.toUTCString()};
      res.json(resObj);
    }
  }
  
})


// listen for requests :)
// replace port with process.env.PORT
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
