function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		next()
	} else {
		res.status(401).json({
			error: true,
			message: 'No autorizado'
		})
	}
}

function isAdmin(req, res, next) {
	if (req.user.isAdmin) {
		next()
	} else {
		res.status(403).json({
			error: true,
			message: 'No es un administrador'
		})
	}
}

module.exports = {
    isAdmin: isAdmin,
    isAuthenticated: isAuthenticated
}