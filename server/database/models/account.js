import Sequelize, { DataTypes } from 'sequelize';
import Model from 'sequelize/lib/model';

import config from '../../core/config';
import {
	sequelizeAdmin as admin
} from '../reference';
import user from './user';
import { ProhibitedEditError } from '../errors';

const attributes = {
	user: {
		type: DataTypes.UUID,
		references: {
			model: user,
			key: 'id',
			onUpdate: 'cascade',
			onDelete: 'cascade'
		},
		primaryKey: true
	},
	email: {
		type: DataTypes.STRING(126),
		allowNull: false,
		unique: true,
		set(value) {
			this.setDataValue('email', value);
			this.setDataValue('verified', false);
		}
	},
	password: {
		type: DataTypes.STRING(126),
		allowNull: false
	},
	verified: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	}
};

const blockUserEdit = instance => {
	if (instance.changed('user')) {
		throw new ProhibitedEditError('Editing the user FK of accounts table is prohibited.')
	}
};

/** @typedef {Model} */
const model = admin.define('accounts', attributes);
model.beforeUpdate([blockUserEdit]);
model.sync({alter: config.devMode}); // Alter when in development mode

export default model