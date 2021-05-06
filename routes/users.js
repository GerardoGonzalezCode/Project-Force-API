var express = require('express');
var router = express.Router();

const users = [
  {id: 1, name: 'Jerry', age: 26}
]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/', (req, res) => {
  const {orderBy} = req.query;
  const orderedUsers = users.orderBy(orderBy);

  res.send(orderedUsers);
}); 

router.post('/', (req, res) => {
  const {name, age} = req.body;
  const user = users.create(name, age);

  res.send(user);
}); 

router.put('/:id', (req, res) => {
  const {id} = req.params;
  const {name, age} = req.body;

  const user = users.find(id);
  user.update({age, name});

  res.send(user);
}); 

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  const user = users.find(id);
  user.delete();

  res.send(user);
});

module.exports = router;
