import _ from 'lodash';
import Sequelize, { DataTypes } from 'sequelize';
import Model from 'sequelize/lib/model';

import config from '../../core/config';
import {
	sequelizeAdmin as admin
} from '../reference';
import { ProhibitedEditError } from '../errors';

export const attributes = {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	firstName: {
		type: DataTypes.STRING(126),
		allowNull: false,
		defaultValue: ''
	},
	lastName: {
		type: DataTypes.STRING(126),
		allowNull: false,
		defaultValue: ''
	},
	username: {
		type: DataTypes.STRING(126),
		allowNull: false,
		defaultValue: ''
	}
};

export const exposedAttributes = _.without(Object.keys(attributes), 'id');

const blockIdEdit = instance => {
	if (instance.changed('id')) {
		throw new ProhibitedEditError('Editing the id PK of users table is prohibited.');
	}
};

/** @typedef {Model} */
const model = admin.define('users', attributes);
model.beforeUpdate(blockIdEdit);
model.sync({alter: config.devMode}); // Alter when in development mode

export default model