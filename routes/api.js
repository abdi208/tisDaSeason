const express = require('express')
const User = require('../models/user')
const Gift = require('../models/gift')
const router = express.Router()


// Get all users lovedones
router.get('/lovedones', (req, res)=> {
    console.log(`session`, req.user)
    User.findById(req.user._id, (err, user) => {
        res.json(user.lovedOnes)
    })
})

// Post create a lovedone
router.post('/lovedones', (req, res) => {
    User.findById(req.user._id, (err, user) => {
        user.lovedOnes.push({
            name: req.body.name,
            age: req.body.age
        }),user.save((err, user) => {
            res.json(user.lovedOnes)
        });
    }).catch((err) => console.log(err))
})

router.get('/lovedones/:id/gifts', (req, res) => {
    User.findById(req.user._id).populate('lovedOnes.gifts').exec((err, user) => {
        res.json(user.lovedOnes.id(req.params.id).gifts)
    })
})

// Post create a gift for a lovedone 
router.post('/lovedones/:id/gifts', (req, res) => {
    console.log('hello world')
    Gift.create({
        name: req.body.name,
        price: req.body.price
    } , (err, gift) => {
        User.findById(req.user._id, (err, user) => {
            
                user.lovedOnes.id(req.params.id).gifts.push(gift)
                user.save()
            
        })
    })
})
// Get the gifts for a specific lovedone
router.get('/lovedones/:id', (req, res) => {
    User.findById(req.user._id, (err, user) => {
        res.json(user.lovedOnes.id(req.params.id).gifts)
    })
})
// Get one specific gift for a loved one
router.get('/lovedones/:id/gifts/:gid', (req, res) => {
    Gift.findById(req.params.gid, (err, gift) => {
        res.json(gift)
    })
})

//Put edit a specific gift for a lovedone
router.put('/lovedones/:id/gifts/:gid', (req, res) => {
    Gift.findById(req.params.gid, (err, gift) => {
        gift['name'] = req.body.name,
        gift['price'] = req.body.price
        gift.save()
        res.json(gift.name)
    })
})





module.exports = router;