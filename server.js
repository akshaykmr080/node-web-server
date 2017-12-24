var express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials/')
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {

    
    return new Date().getFullYear();
});


hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.use((req, res, next) => {
    res.render('maintainance.hbs');
})

app.use(express.static(__dirname+'/public'));

app.use((req, res, next) => {
    var log = `new Date().getFullYear()+':'+${req.method}+'  :'+${req.url}`;
    //console.log();
    fs.appendFileSync('server.log', log+'\n');
    next();
})
app.get('/', (request, response) => {
    // response.send({
    //     name: 'Akshay',
    //     likes: [
    //         'biking','cycling'
    //     ]
    // });

    response.render('home.hbs', {
        pageTitle: 'Home page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to this new Website'
    })
});

app.get('/about', (req, res) => {
   // res.send('About page');
   res.render('about.hbs', {
       pageTitle: 'About this page'
   });
});


//bad request

app.listen(4000, () => {
    console.log("server is up on 4000");
});