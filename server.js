const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const {Compute} = require('./compute');

var app = express();
const compute = new Compute('Jack');

//To use reusable partials
hbs.registerPartials(__dirname+'/views/partials');
//Set Template Engine as hbs
app.set('view engine', 'hbs');
//To render static pages
app.use(express.static(__dirname+'/public'));

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = now+': '+req.method+' '+req.url;
  fs.appendFile('server.log', log+'\n', (err)=>{
    if(err){
        console.log(err);
    }
  });
  next();
});
/*
For Maintenance

app.use((req,res,next)=>{
  res.render('maintenance.hbs',{
    pageTitle:'Maintenance',
    maintenanceMessage: 'Site is under maintenance'
  });
});
*/
//Register Helper Functions
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});



app.get('/',(req,res)=>{

  /*Testing Classes in JS*/
  console.log(compute.welcomeMessage());
  console.log(compute.getProduct(4,7));
  console.log('Call Compute.getName '+Compute.getName());
  /*Ends*/

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
