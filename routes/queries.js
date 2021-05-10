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

const getUserByEmail = (request, response) => {
  const email = request.params.email
  let emaild = '%' + email + '%'
  pool.query(`SELECT * FROM users WHERE email ilike $1`, [emaild], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name, email, phone, birth, password, imageUrl, seed, department, role } = request.body

  pool.query('SELECT * FROM users WHERE email = $1', [email], (error, resultsS) => {
    if (error) {
      throw error
    }
    if (resultsS.rows[0] === undefined) {
      pool.query('INSERT INTO users (name, email, phone, birth, password, imageUrl, seed, department, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
      [name, email, phone, birth, password, imageUrl, seed, department, role ], (error, results) => {
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
  const { name, email, phone, birth, imageUrl } = request.body

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, resultsS) => {
    if (error) {
      throw error
    }
    if (resultsS.rows[0].email === email) {
      pool.query(
        'UPDATE users SET name = $1, email = $2, phone = $3, birth = $4, imageurl = $5 WHERE id = $6',
        [name, email, phone, birth, imageUrl, id],
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
            'UPDATE users SET name = $1, email = $2, phone = $3, birth = $4, imageurl = $5 WHERE id = $6',
            [name, email, phone, birth, imageUrl, id],
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
  const { name, incharge, seed, manager } = request.body

  pool.query('SELECT * FROM department WHERE name = $1', [name], (error, resultsS) => {
    if (error) {
      throw error
    }
    if (resultsS.rows[0] === undefined) {
      pool.query('INSERT INTO department (name, incharge, seed, manager) VALUES ($1, $2, $3, $4)', 
      [name, incharge, seed, manager], (error, results) => {
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
  const { name, incharge, manager } = request.body

  pool.query('SELECT * FROM department WHERE id = $1', [id], (error, resultsS) => {
    if (error) {
      throw error
    }
    if (resultsS.rows[0].name === name) {
      pool.query(
        'UPDATE department SET name = $1, incharge = $2, manager = $3 WHERE id = $4',
        [name, incharge, manager, id],
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
            'UPDATE department SET name = $1, incharge = $3, manager = $4 WHERE id = $5',
            [name, incharge, manager, id],
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
      pool.query('INSERT INTO roles (name, seed) VALUES ($1,$2)', [name, seed], (error, results) => {
        if (error) {
          throw error
        }
        pool.query('SELECT * FROM roles WHERE name = $1', [name], (error, resultsUser) => {
          if (error) {
            throw error
          }
          response.status(201).send(`Role added with ID: ${resultsUser.rows[0].id}`)
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
  getUserByEmail,
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