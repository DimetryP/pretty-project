const { Router } = require('express');
const { redisClient } = require('../redis/redis');
const { Auth } = require('../controllers/auth');
const { Events } = require('../controllers/events');
const { Visitors } = require('../controllers/visitors');
const { UserModel, EventModel, VisitorModel } = require('../model');
const { checkUserRegData, checkUserLoginReg } = require('../middlewares/reg.middleware');
const { userCheckAuthData, userCheckIsAdministrator, userCheckIsAuthorized, userCheckPasswordIsAdministrator } = require('../middlewares/auth.middleware');

const router = Router();

const visitors = new Visitors()
      events = new Events()
      auth = new Auth();

router.get('/visitors', [userCheckIsAuthorized], async (req, res) => await visitors.getAllVisitors());
router.get('/visitor/:id', [userCheckIsAuthorized], async (req, res) => await visitors.getCurrentVisitor(req.body.visitor_id));
router.get('/events', [userCheckIsAuthorized], async (req, res) => await events.getAllEvents());
router.get('/events/:id', [userCheckIsAuthorized], (req, res) => new events.getCurrentEvent(req.body.user_id, req.body.event_id));
router.get('/delete_events', (req, res) => events.deleteDbDataAfter3Years());
router.post('/registration', [checkUserRegData, checkUserLoginReg], async (req, res) => {
  await auth.registration(new UserModel(req.body.login, req.body.password)) 
  
  res.redirect('/');
});
router.post('/authorization', [userCheckAuthData], (req, res) => {
  res.send(`${req.body.login} had been successfully authorized in application`);

  res.redirect('/');
});
router.post('/add_event', [userCheckIsAuthorized], async (req, res) => await events.addEvent(req.visitor_id, new EventModel(req.body.event_data))); //visitorDataCheck
router.post('/logout', [userCheckIsAuthorized], async (req, res) => {
  await auth.logout(req.body.login) 

  res.redirect('/auth');
});
router.delete('/delete_account', [userCheckIsAuthorized, userCheckPasswordIsAdministrator], async (req, res) => await auth.deleteAccount());
router.put('/update_password', [userCheckIsAuthorized, userCheckPasswordIsAdministrator], async (req, res) => await auth.updatePassword(req.body.password));
router.put('/update_login', [userCheckIsAuthorized, userCheckPasswordIsAdministrator], async (req, res) => await auth.updateLogin(req.body.login));

module.exports = router;
