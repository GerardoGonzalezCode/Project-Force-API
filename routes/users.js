const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')

var router = express.Router();

router.get('/', db.getUsers)
router.get('/user/:id', db.getUserById)
router.get('/search/:email', db.getUserByEmail)
router.post('/', db.createUser)
router.put('/:id', db.updateUser)
router.delete('/:id', db.deleteUser)

module.exports = router;