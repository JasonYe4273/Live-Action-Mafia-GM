import express from 'express';
import httpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

import config from '../../core/config.js';

const secret = new Buffer(config.sessionJWTKey, 'base64');

export const createSessionToken = id => {
	return jwt.sign({id}, secret, {expiresIn: config.sessionJWTExpire});
};

export const verifySessionToken = function (request, response, next) {
	try {
		request.body.user = jwt.verify(request.cookies.sessionJWT, secret);
		
		next();
	} catch (err) {
		console.log(err.message);
		response.status(httpStatus.UNAUTHORIZED).json({reason: 'Invalid session'});
	}
};
