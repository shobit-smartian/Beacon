var express = require('express');
var router = express.Router();
var token = require('../controllers/accessTokens')
var recommendation = require('../controllers/recommendations')

/* GET home page. */
router.get('/getToken', recommendation.getToken);

router.get('/fetchall', /*token.validateToken,*/ recommendation.fetchAll);

router.get('/getPatientRecommendations', recommendation.getPatientRecommendations);

router.get('/getPatientRec/:transcriptionId', recommendation.getPatientRecommendations);

router.get('/:type', /*token.validateToken,*/ recommendation.fetch);

router.post('/', /*token.validateToken,*/ recommendation.save);



module.exports = router;
