const { Router } = require('express');
const { Auth } = require('../auth');
const { User } = require('../model');
const { checkUserRegData, checkUserLoginReg } = require('../middlewares/reg.middleware');
const { userCheckAuthData } = require('../middlewares/auth.middleware');

const router = Router();

router.get('/', (req, res) => res.render('./public/index.html'));
router.get('/authorization', (req, res) => res.render('./public/auth.html'));
router.get('/registration', (req, res) => res.render('./public/registration.html'));
router.get('/events', (req, res) => res.render('./public/events.html'));
router.get('/events/:id', (req, res) => res.render('./public/event.html'));
router.get('/settings', (req, res) => res.render('./public/settings.html'));
router.get('/visitors', (req, res) => res.render('./public/visitors.html'));
router.get('/visitors/:id', (req, res) => res.render('./public/visitor.html'));

router.post('/registration', [checkUserRegData, checkUserLoginReg], async (req, res) => await new Auth().registration(new User(req.body.login, req.body.password)));
router.post('/authorization', [userCheckAuthData], async (req, res) => await new Auth().authorization(req.body.login));
router.post('/add_event', (req, res) => console.log('Add Event'));
router.post('/logout', () => console.log("Logout"));
router.delete('/delete_account', () => console.log("Delete account"));

module.exports = router;
