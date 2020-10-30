const server = require('express').Router()
const { isAdmin } = require('./helper')

server.post('/', isAdmin, (req, res) => {
	const names = req.files.map((img) => img.filename)
	res.send(JSON.stringify(names))
})

module.exports = server
