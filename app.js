const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

// to keep the header different in a file and then include it in html
hbs.registerPartials(__dirname + '/views/partials');

// app.set lets us set lot of configs for out express app, but here we are setting our view engine.
app.set('view engine', 'hbs'); 

// express middlewear to log the traffic comes to the server
app.use((req, res, next) => {
  let timeStamp = new Date().toString();
  let log = `${timeStamp} Method: ${req.method} Path: ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.error('unable to log the info...');
    }
  })
  console.log();
  next();
});

// register a helper for didplaying year in hbs files.
hbs.registerHelper('getCurrYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('uppMe', (text) => {
  return text.toUpperCase();
})

/* // root page Route
app.get('/', (request, response) => {
  // send text/html data
  // response.send('<h1>Hey Express!</h1>');

 // send application/json data
    response.send({
      name: 'Harshu',
      likes: [
        'HMOVIES',
        'KARDASHIAN'
      ]
    });
});
 */

// make home page route and render it.
app.get('/', (req, res) => {
  res.render('index.hbs', {
    title: `Yo this is A$H, thank you for visiting my site though its gon' take some time to make it an actual goddnamn Web-Site`,
    info: 'still under construction...',
  });
});

 // maintanance middlewear
 app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

// use a middlewear to view our help.html page.
app.use(express.static(__dirname + '/public'));

// about page Route
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About Page!',
  });
});

// projects page Route
app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    title: 'Portfolio Page!',
  });
});

// bad request
app.get('/bad', (req, res) => {
  res.send({
    error: 'this is a bad request'
  });
});

// this second arguement is optional.
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});