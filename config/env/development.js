'use strict';

module.exports = {	
	db: process.env.MONGOLAB_URI_DEV || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/mulherpratica-dev',
	app: {
		title: 'Mulher Prática - Development Environment'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '64358772177-lqtq513bcp3kuve4rqn91gvqdrrbefel.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || 'LWyL8-_RDOsyfm9BeMOI3BDj',
		callbackURL: '/auth/google/callback'
	}	
};
