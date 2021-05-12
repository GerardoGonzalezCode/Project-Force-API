const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const randomstring = require("randomstring");

var router = express.Router();

router.get('/', db.getUsers)
router.get('/user/:id', db.getUserById)
router.get('/search/:email', db.getUserByEmail)
router.get('/password', async(req, res) => {
    try {
      let password = randomstring.generate();
      res.send(JSON.stringify({"pass":password}))
    } catch (error) {
        console.log('Error', error.message);
    }
  });
router.post('/', db.createUser)
router.put('/:id', db.updateUser)
router.delete('/:id', db.deleteUser)

module.exports = router;