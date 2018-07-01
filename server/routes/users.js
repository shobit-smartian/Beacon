var express = require('express');
var router = express.Router();
var user = require('../controllers/users')
var token = require('../controllers/accessTokens')



router.post('/login', user.login, token.getToken);

router.post('/register', user.register);

router.get('/getMe',token.validateToken, token.getUser);

router.get('/fetchAll',token.validateToken, user.fetchAll);

router.get('/:userId',token.validateToken, user.fetch);

router.post('/upload',token.validateToken, user.uploadFile);

router.post('/update/:userId',token.validateToken, user.updateUser);

router.delete('/delete/:userId',token.validateToken, user.delete);

module.exports = router;
