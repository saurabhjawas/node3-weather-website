const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bulla Jackson'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Bulla Jackson'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Bulla Jackson'
    })
});

app.get('/weather', (req, res) => {
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia'
    // })

    if (!req.query.address) {
      return res.send({
        error: 'You must provide the address in request'
      });
    };

    const address = req.query.address

    geocode(req.query.address, (errStr, {latitude, longitude, location}={})=> {

      if (errStr) {
        return res.send({
          error: errStr
        });
      };

      // if we are here it means we got the corrdinates
      // getting the forecast using the corrdinates

      forecast(latitude, longitude, (errStr, forecastStr)=> {
        if (errStr) {
            return res.send({
              location: location,
              forecast: forecastStr
            });
        };

        // if we are here it means we got the forecast
        return res.send({
          searchTerm: address,
          location,
          forecast: forecastStr
        });

      });

    });



    // res.send({
    //   searchTerm: req.query.address,
    //   placeName: 'some place placeholder',
    //   Report: 'Lorem Ipsunm'
    // })

});

app.get('/products', (req,res)=> {

  if (!req.query.search) {
    return res.send({
      error: 'you must provide a search term'
    });
  };

  console.log(req.query.search);
  res.send({
    products: []
  })

})

app.get('/help/*', (req,res)=> {
  // res.send('Help article not found');
  res.render('404',{
    title: '404',
    errorMsg: 'Help article not found',
    name: 'Bulla Jackson'
  })
});

app.get('*', (req, res)=> {
  // res.send('My 404 page')
  res.render('404',{
    title: '404',
    errorMsg: 'Page not Found',
    name: 'Bulla Jackson'
  })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
});
