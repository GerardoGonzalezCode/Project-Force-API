const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5500,
})
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name, email, phone, birth, password, seed, department, role } = request.body

  pool.query('SELECT * FROM users WHERE email = $1', [email], (error, resultsS) => {
    if (error) {
      throw error
    }
    if (resultsS.rows[0] === undefined) {
      pool.query('INSERT INTO users (name, email, phone, birth, password, seed, department, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', 
      [name, email, phone, birth, password, seed, department, role ], (error, results) => {
        if (error) {
          throw error
        }
        pool.query('SELECT * FROM users WHERE email = $1', [email], (error, resultsUser) => {
          if (error) {
            throw error
          }
          response.status(201).send(`User added with ID: ${resultsUser.rows[0].id}`)
        })
      })
    } else {
      response.status(400).send(`Duplicated User`)
    }
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email, phone, birth } = request.body

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, resultsS) => {
    if (error) {
      throw error
    }
    if (resultsS.rows[0].email === email) {
      pool.query(
        'UPDATE users SET name = $1, email = $2, phone = $3, birth = $4, WHERE id = $5',
        [name, email, phone, birth, id],
        (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).send(`User modified with ID: ${id}`)
        }
      )
    } else if (resultsS.rows[0].email !== email) {
      pool.query('SELECT * FROM users WHERE email = $1', [email], (error, resultsS) => {
        if (error) {
          throw error
        }
        if (resultsS.rows[0] === undefined) {
          pool.query(
            'UPDATE users SET name = $1, email = $2, phone = $3, birth = $4 WHERE id = $5',
            [name, email, phone, birth, id],
            (error, results) => {
              if (error) {
                throw error
              }
              response.status(200).send(`User modified with ID: ${id}`)
            }
          )
        }  else {
          response.status(400).send(`Duplicated User`)
        }
      })
    }
  })
  
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

const getDepartments = (request, response) => {
  pool.query('SELECT * FROM department ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getDepartmentById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM department WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createDepartment = (request, response) => {
  const { name, area, incharge, seed, manager } = request.body

  pool.query('SELECT * FROM department WHERE name = $1', [name], (error, resultsS) => {
    if (error) {
      throw error
    }
    if (resultsS.rows[0] === undefined) {
      pool.query('INSERT INTO department (name, area, incharge, seed, manager) VALUES ($1, $2, $3, $4, $5)', 
      [name, area, incharge, seed, manager], (error, results) => {
        if (error) {
          throw error
        }
        pool.query('SELECT * FROM department WHERE name = $1', [name], (error, resultsUser) => {
          if (error) {
            throw error
          }
          response.status(201).send(`Department added with ID: ${resultsUser.rows[0].id}`)
        })
      })
    } else {
      response.status(400).send(`Duplicated Department`)
    }
  })
}

const updateDepartment = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, area, incharge, manager } = request.body

  pool.query('SELECT * FROM department WHERE id = $1', [id], (error, resultsS) => {
    if (error) {
      throw error
    }
    if (resultsS.rows[0].name === name) {
      pool.query(
        'UPDATE department SET name = $1, area = $2, incharge = $3, manager = $4 WHERE id = $5',
        [name, area, incharge, manager, id],
        (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).send(`Department modified with ID: ${id}`)
        }
      )
    } else if (resultsS.rows[0].name !== name) {
      pool.query('SELECT * FROM department WHERE name = $1', [name], (error, resultsS) => {
        if (error) {
          throw error
        }
        if (resultsS.rows[0] === undefined) {
          pool.query(
            'UPDATE department SET name = $1, area = $2, incharge = $3, manager = $4 WHERE id = $5',
            [name, area, incharge, manager, id],
            (error, results) => {
              if (error) {
                throw error
              }
              response.status(200).send(`Department modified with ID: ${id}`)
            }
          )
        }  else {
          response.status(400).send(`Duplicated Department`)
        }
      })
    }
  })
  
}

const deleteDepartment = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM department WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Department deleted with ID: ${id}`)
  })
}

const getRoles = (request, response) => {
  pool.query('SELECT * FROM roles ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getRoleById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM roles WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createRole = (request, response) => {
  const { name, seed } = request.body

  pool.query('SELECT * FROM roles WHERE name = $1', [name], (error, resultsS) => {
    if (error) {
      throw error
    }
    if (resultsS.rows[0] === undefined) {
      pool.query('INSERT INTO roles (name, seed) VALUES ($1)', [name, seed], (error, results) => {
        if (error) {
          throw error
        }
        pool.query('SELECT * FROM roles WHERE name = $1', [name], (error, resultsUser) => {
          if (error) {
            throw error
          }
          response.status(201).send(`Department added with ID: ${resultsUser.rows[0].id}`)
        })
      })
    } else {
      response.status(400).send(`Duplicated Role`)
    }
  })
}

const updateRole = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, seed } = request.body

  pool.query('SELECT * FROM roles WHERE id = $1', [id], (error, resultsS) => {
    if (error) {
      throw error
    }
    if (resultsS.rows[0].name === name) {
      pool.query(
        'UPDATE roles SET name = $1, seed = $2 WHERE id = $3',
        [name, seed, id],
        (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).send(`Role modified with ID: ${id}`)
        }
      )
    } else if (resultsS.rows[0].name !== name) {
      pool.query('SELECT * FROM roles WHERE name = $1', [name], (error, resultsS) => {
        if (error) {
          throw error
        }
        if (resultsS.rows[0] === undefined) {
          pool.query(
            'UPDATE roles SET name = $1, seed = $2 WHERE id = $3',
            [name, seed, id],
            (error, results) => {
              if (error) {
                throw error
              }
              response.status(200).send(`Role modified with ID: ${id}`)
            }
          )
        }  else {
          response.status(400).send(`Duplicated Role`)
        }
      })
    }
  })
  
}

const deleteRole = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM roles WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Role deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
}