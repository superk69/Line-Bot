var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var weather = require('weather-js');

var app = express();

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 4000));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});


app.post('/webhook', (req, res) => {
  var text = req.body.events[0].message.text
  var sender = req.body.events[0].source.userId
  var replyToken = req.body.events[0].replyToken
  console.log(text, sender, replyToken);
  console.log(typeof sender, typeof text);
  // console.log(req.body.events[0])
  if (text === 'สวัสดี' || text === 'Hello' || text === 'hello') {
    sendText(sender, text);
  }
  res.sendStatus(200);
});


function sendText (sender, text) {
  var data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'สวัสดีค่ะ เราเป็นผู้ช่วยปรึกษาด้านความรัก สำหรับหมามิ้น 💞'
      }
    ]
  };
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer {YV4YHUNnJhTURSd9BzLGokn7ALa8+pKl/KooSoAEW7CL4yNF9TwjC3Jw5TuivsoQ3VwhB87kTwCamwcHFHj0Qv6XGMZKbJYXziekYqmHFnBj9AvZpxya3rRNupun8JIFv5EzUZUPlfZcywrvH9jhgQdB04t89/1O/w1cDnyilFU=}'
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error');
    if (res) console.log('success');
    if (body) console.log(body);
  });
}




app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
