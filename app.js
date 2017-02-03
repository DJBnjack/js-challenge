if (!process.env.apiKey) {
  console.log("########################################");
  console.log("### Set environment variables first! ###");
  console.log("########################################");
  process.exit(1);
}

var express = require('express');
var exbars = require('exbars');
var app = express();

var firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    signInSuccessUrl: process.env.signInSuccessUrl,
};

// app.engine('hbs', exbars({defaultLayout: 'main'}));
// app.set('view engine', 'hbs');

// app.get('/login', function(req, res) {
//   res.render('login', {fbConfig: firebaseConfig});
// });

// // First our index
// app.get('/', function(req, res) {
//   var accsite;
//   if (req.headers.host !== "js-challenge.nl") {
//     accsite = true;
//   }

//   page_data = {
//     fbConfig: firebaseConfig,
//     accsite: accsite
//   };
  
//   res.render('index', page_data);
// });

// Then our static stuff
app.use(express.static('public'));

app.listen(8080, function () {
  console.log('JS-challenge listening on port 8080!');
});