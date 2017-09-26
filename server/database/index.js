import Model from 'sequelize/lib/model';
// Import and re-export all models for better management.
import account from './models/account';
import user from './models/user';

/*
 Database architecture:
 accounts - user login information
 */


export default {
	account,
	user
};
