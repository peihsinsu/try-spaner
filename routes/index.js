var express = require('express');
var router = express.Router();
var spanner = require('../lib/spanner');
var log = require('nodeutil').simplelog;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/singer/:id', function(req, res, next) {
	var data = req.body;
	spanner.addSigner(req.params.id, data, function(err, doc) {
		if(err) {
			log.error('error:', err);
			return res.status(500).send(err);
		}
		log.info('result:', doc);
		res.status(200).send(doc);
	});
});

router.get('/singer/list', function(req, res, next) {
	spanner.listAllSingers(function(err, doc) {
		if(err) {
			log.error('error:', err);
			return res.status(500).send(err);
		}
		log.info('result:', doc);
		res.status(200).send(doc);
	});
});



module.exports = router;
