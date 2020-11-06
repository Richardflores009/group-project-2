const router = require('express').Router();
const sequelize = require('../../config/config');
const { Post, Landlord, Tenant, Comment, Property } = require('../../models');

// get all users
router.get('/', (req, res) => {
  Post.findAll({
    order: [['created_at', 'DESC']],
    attributes: [
      'id',
      'title',
      'created_at'
    ],
    include: [
      // include the Comment model here:
      {
        model: Comment,
        attributes: ['id', 'body', 'landlord_id', 'tenant_id'],
        include: {
          model: Landlord,
          attributes: ['email']
        },
        include: {
            model: Tenant,
            attributes: ['email']
        }
      },
      {
        model: Landlord,
        attributes: ['email']
      },
      {
        model: Tenant,
        attributes: ['email']
      }
    ]
   })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: 
    ['id',
     'title', 
     'created_at',
    ],
    include: [
        {
            model: Landlord,
            attributes: ['email']
        },
      {
        model: Tenant,
        attributes: ['email']
      },
    ]
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message : 'no post found with this id'})
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Post.create({
    title: req.body.title,
    tenant_id: req.body.tenant_id,
    landlord_id: req.body.landlord_id
  })
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


router.put('/:id', (req, res) => {
  Post.update(
    {
    title: req.body.title
  },
  {
    where: {
      id: req.params.id
    }
  }
  )
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'no post found with this id' })
      return;
    }
    res.json(dbPostData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'no post found with this id' });
      return;
    }
    res.json(dbPostData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})



module.exports = router;
