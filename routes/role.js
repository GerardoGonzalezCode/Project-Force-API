const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')

var router = express.Router();

router.get('/', db.getRoles)
router.get('/:id', db.getRoleById)
router.post('/', db.createRole)
router.put('/:id', db.updateRole)
router.delete('/:id', db.deleteRole)

module.exports = router;