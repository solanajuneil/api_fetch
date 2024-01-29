const express = require('express')
const router = express.Router()
const User = require('../models/user_models')

//Getting all
router.get('/', async(req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch(error) {
        res.status(500).json({ message: error.message })
   }
} )

//Getting one 
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})

//Creating one
router.post('/', async(req, res) => { 
    const user = new User({
        name: req.body.name, 
        dateOfBirth: req.body.dateOfBirth,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Updating one
router.patch('/:id', getUser, async(req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.dateOfBirth != null) {
        res.user.dateOfBirth = req.body.dateOfBirth
    }
    if (req.body.address != null) {
        res.user.address = req.body.address
    }
    try {
        const updateUser = await res.user.save()
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Delete one 
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({message: "Deleted Successful"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


//MiddleWare
async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({message: 'Cannot Find User '})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    res.user = user
    next()
}


module.exports = router