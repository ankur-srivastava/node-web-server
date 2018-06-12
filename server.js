const express = require('express');
const hbs = require('hbs');

var app = express();

//To use reusable partials
hbs.registerPartials(__dirname+'/views/partials');
//Set Template Engine as hbs
app.set('view engine', 'hbs');
//To render static pages
app.use(express.static(__dirname+'/public'));

//Register Helper Functions
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});



app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle:'Home',
    welcomeMessage: 'Welcome to the Site'
  });
});

app.get('/about', (req,res)=>{
  res.render('about.hbs', {
    pageTitle:'About'
  });
});

app.get('/bad', (req,res)=>{
  res.send({
    errorMessage:'Bad Request'
  });
});

app.listen(3000, ()=>{
  console.log('Server is up at port 3000');
});
