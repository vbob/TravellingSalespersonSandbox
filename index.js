// Webserver Basic Dependency
let express = require('express')
let app = express()

// Internationalization Dependency
let i18n = require('i18n')

// Cookie Parser Dependency
var cookieParser = require('cookie-parser')

// Configure Internationalization
i18n.configure({
    defaultLocale: 'en',
    locales: ['br', 'en'],
    cookie: 'locale',
    directory: __dirname + '/locales'
});

// Port to Listen
app.listen(8000, () => {
    console.log("Travelling Salesperson Sandbox by vbob")
    console.log("Use it in http://localhost:8000")
})

// Initialize Cookie Parser
app.use(cookieParser());

// Initialize Internationalization
app.use(i18n.init);
app.use(function(req, res, next) {

    // Express Intl engines
    res.locals.__ = res.__ = function() {
        return i18n.__.apply(req, arguments);
    };

    next();
});

// Initialize view engine
app.set('view engine', 'pug') // view engine
app.set('views', './views') // view engine folder

// Initialize routes
app.get('/', function (req, res) {
    res.render('index', {
        // Topbar reference
        source: "index"
    })
})

app.get('/options', function (req, res) {
    res.render('options', {
        source: "options"
    })
})

app.get('/history', function (req, res) {
    res.render('history', {
        source: "history"
    })
})

app.get('/about', function (req, res) {
    res.render('about', {
        source: "about"
    })
})

app.get('/about', function (req, res) {
    res.render('about', {
        source: "about"
    })
})

// Change locale
app.get('/setlocale/:locale', function (req, res) {
    res.cookie('locale', req.params.locale);
    res.redirect('back');
});

// Algorithms Management
app.get('/algorithms/list', function (req, res) {
    let alg_list = require('./algorithms').algorithms_files
    res.send(alg_list)
})

app.get('/algorithms/*', function (req, res) {
    res.sendFile(__dirname+'/algorithms/'+req.params[0]+'.js')
})

// Escape Route
app.get('/*', function (req, res) {
    res.sendFile(__dirname+'/dist/'+req.params[0])
})

module.exports = app