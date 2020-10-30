const server = require('express').Router()
const { User } = require('../db.js')
const { isAdmin, isAuthenticated } = require('./helper')

server.put('/promote/:id', isAuthenticated, isAdmin, (req, res) => {
	User.findByPk(req.params.id)
		.then((user) => {
			if (!user) return res.status(404).send('Id no válido')
			return user.update({ isAdmin: true })
		})
		.then((user) => res.send(user))
		.catch((err) => res.status(500).send(err))
})

module.exports = server
