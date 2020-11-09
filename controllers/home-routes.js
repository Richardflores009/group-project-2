const router = require('express').Router();
const sequelize = require('../config/config');
const { Post, Landlord, Tenant, Comment, Property } = require('../models');


<<<<<<< HEAD
// get single post
router.get('/', (req, res) => {
  console.log("tenantroutepageid",req.session.landlord_id)
  Property.findAll({
    where: {
      // use the ID from the session
      landlord_id: req.session.landlord_id
    },
    attributes: [
      'id',
      'address',
      'description',
      'maintenance',
      'pet'
    ],
    include: [
      {
        model: Landlord,
        attributes: ['id', 'first_name', 'last_name', 'email'],
      },
      {
        model: Tenant,
        attributes: ['first_name']
      }
    ]
  })
    .then(dbPostData => {
      console.log('yoyoyoy', dbPostData)
      // serialize data before passing to template
      const property = dbPostData.map(property => property.get({ plain: true }));
      
      res.render('landlord-dashboard', { property, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
    // if (req.session.loggedIn) {
    //   res.redirect("/");
    //   return;
    // }
  
    res.render("landlord-login");
  });
  
  router.get("/signup", (req, res) => {
    // if (req.session.loggedIn) {
    //   res.redirect("/");
    //   return;
    // }
  
    res.render("landlord-signup");
=======
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
  
    res.render("login");
  });
  
  router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
  
    res.render("signup");
>>>>>>> 5560d917371baea5fe52d4820a5c367ad11c3f60
  });
  
  module.exports = router;
  