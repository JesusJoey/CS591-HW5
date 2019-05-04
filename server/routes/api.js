const express = require('express');
const router = express.Router();
const request = require('request')

/*router.get('/', function(req, res, next) {
    res.render('index', { title: 'Weather' });
});
*/
router.get('/',function(req,res) {
  const options = {
    method: 'GET',
    url: 'http://www.apixu.com/doc/Apixu_weather_conditions.json',
  };

  request(options, function (error,response,body) {
    if (error) throw new Error(error);
    res.body = JSON.parse(body);
    res.send(body);
  });
});

module.exports = router;
