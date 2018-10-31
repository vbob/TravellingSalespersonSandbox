let app = require('../index')
let supertest = require('supertest')

describe('server', function () {
    it('renders the index page', function (done) {
        var cheerio = require('cheerio');

        supertest(app)
            .get('/')
            .expect(200)
            .end(function (err, res) {
                var $ = cheerio.load(res.body);
                console.log($('svg#cities_map'))

                done();
            })
    })
})