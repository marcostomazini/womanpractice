'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;
	var message = null;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Merge existing user

		user = _.extend(user, req.body);

		user.updated = Date.now();
	
		user.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						User.findById(user._id).exec(function(err, userRetorno) {
							if (err) return next(err);
							if (!userRetorno) return next(new Error('Failed to load user '));
							user = _.extend(user, userRetorno);

							res.json(user);
						});
					}
				});
			}
		});
	} else {
		res.status(401).send({
			message: 'User is not signed in'
		});
	}
};

/**
 * List of usuarioMobiles
 */
exports.list = function(req, res) {
	User.find({}, '-salt -password -providerData -roles -provider').sort('-created').exec(function(err, usuarios) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(usuarios);
		}
	});
};

/**
 * Quantidade de usuarios
 */
exports.count = function(req, res) {	
	User.count().exec(function(err, qtde) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var counters = { 
				users: qtde,
				fornecedores: 10,
				cadastros: 20
			};

			res.json(counters);
		}
	});
};

/**
 * Send User
 */
exports.me = function(req, res) {	
	res.json(req.user || null);
};