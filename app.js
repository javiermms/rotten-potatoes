const express = require('express')
const app = express()

var exphbs = require('express-handlebars');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes');

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
});

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.render('home', { msg: 'Handlebars are Cool!' });
// });

// OUR MOCK ARRAY OF PROJECTS
// let reviews = [
//   { title: "Great Review", movieTitle: "Ready Player One" },
//   { title: "Awesome Movie", movieTitle: "Titanic" }
// ]

// INDEX
app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})

// NEW
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})

// CREATE
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
});


