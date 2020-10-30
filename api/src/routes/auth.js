const server = require('express').Router()
const { User } = require('../db.js')
const { isAuthenticated } = require('./helper')

server.get('/me', isAuthenticated, (req, res) => {
	res.send(req.user)
})

server.put('/me', isAuthenticated, (req, res) => {
    const { firstName, lastName, password, email} = req.body
    const usuario = req.user
    usuario.firstName = firstName || usuario.firstName
    usuario.lastName = lastName || usuario.lastName
    usuario.password = password || usuario.password
    usuario.email = email ||usuario.email
    
    usuario.save().then(user =>  {
        res.status(200).send(user)
        console.log("USUARIO CAMBIADO--" + usuario)}) 
    .cath(err => res.send(err))

})

server.delete('/me', isAuthenticated, (req, res) => {
    const user = req.user
    user.destroy()
    res.status(200).json(user)
})

module.exports = server