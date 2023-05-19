const { Router } = require('express');
const { redisClient } = require('../redis/redis');
const { Auth } = require('../controllers/auth');
const { Events } = require('../controllers/events');
const { UserModel, EventModel, VisitorModel } = require('../model');
const { checkUserRegData, checkUserLoginReg } = require('../middlewares/reg.middleware');
const { userCheckAuthData, userCheckIsAdministrator, userCheckIsAuthorized } = require('../middlewares/auth.middleware');

const router = Router();

router.get('/', (req, res) => res.render('./public/index.html'));
router.get('/authorization', (req, res) => res.render('./public/auth.html'));
router.get('/registration', (req, res) => res.render('./public/registration.html'));
router.get('/events', (req, res) => res.render('./public/events.html'));
router.get('/events/:id', (req, res) => res.render('./public/event.html'));
router.get('/settings', (req, res) => res.render('./public/settings.html'));
router.get('/visitors', (req, res) => res.render('./public/visitors.html'));
router.get('/visitors/:id', (req, res) => res.render('./public/visitor.html'));

router.post('/registration', [checkUserRegData, checkUserLoginReg], async (req, res) => {
  await new Auth().registration(new UserModel(req.body.login, req.body.password)) 
  
  res.redirect('/');
});
router.post('/authorization', [userCheckAuthData], (req, res) => {
  res.send(`${req.body.login} had been successfully authorized in application`);

  res.redirect('/');
});
router.post('/add_event', [userCheckIsAuthorized], (req, res) => console.log('Add Event'));
router.post('/logout', [userCheckIsAuthorized], async (req, res) => await new Auth().logout(req.body.login));
router.delete('/delete_account', [userCheckIsAuthorized], (req, res) => res.send("Delete account"));

module.exports = router;
