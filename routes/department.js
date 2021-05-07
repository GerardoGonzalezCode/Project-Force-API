const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')

var router = express.Router();

router.get('/', db.getDepartments)
router.get('/:id', db.getDepartmentById)
router.post('/', db.createDepartment)
router.put('/:id', db.updateDepartment)
router.delete('/:id', db.deleteDepartment)

module.exports = router;