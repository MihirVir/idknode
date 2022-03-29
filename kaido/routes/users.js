const express = require('express');
const passport = require('passport');
const router = express.Router();
const usersController = require('../controller/users_controller')

router.get('/profile/:id', passport.checkAuthentication , usersController.profile)
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create', usersController.create);
// router.post('/create-session', usersController.createSession);
//using passport to authenticate
router.post('/create-session', passport.authenticate(
    'local', {failureRedirect: '/users/sign-in'}
), usersController.createSession)


router.get('/sign-out', usersController.destroySession);
router.post('/update/:id', passport.checkAuthentication, usersController.update)
module.exports = router;