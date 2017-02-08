if (!process.env.apiKey) {
  console.log("########################################");
  console.log("### Set environment variables first! ###");
  console.log("########################################");
  process.exit(1);
}

var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    signInSuccessUrl: process.env.signInSuccessUrl,
};

function b64DecodeUnicode(str) {
    function atob(str) {return new Buffer(str, 'base64').toString('binary');}
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function b64EncodeUnicode(str) {
    function btoa(str) {return new Buffer(str.toString(), 'binary').toString('base64');}
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}


app.post('/challenge', function(req, res) {
  console.log(req.body.input);

  var f = new Function(b64DecodeUnicode(req.body.input));
  var execution = function(f) {
    retString = "";
    var console = {};
    console.log = function(str){retString += str;};
    f();
    return retString;
  };

  result = execution(f);
  res.send(JSON.stringify({output: b64EncodeUnicode(result)}, null, 2));
});

// The static stuff
app.use(express.static('public'));

app.listen(8080, function () {
  console.log('JS-challenge listening on port 8080!');
});