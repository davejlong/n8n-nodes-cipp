/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import { INodeType, INodeTypeDescription } from "n8n-workflow";

import { getDomainOptions, getGDAPRoleOptions, getLicenseOptions, getTenantOptions } from "./methods/loadOptions";

import * as gdap from './actions/gdap';
import * as tenant from './actions/tenant';
import * as user from './actions/user';

export class CIPP implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'CIPP',
		name: 'cipp',
		icon: 'file:cipp.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Work with the CIPP API',
		defaults: {
			name: 'CIPP',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'cippOAuth2Api',
				required: true,
			}
		],
		requestDefaults: {
			baseURL: "={{ $credentials.cippApiUrl }}/api"
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'GDAP', value: 'gdap' },
					{ name: 'Tenant', value: 'tenant' },
					{ name: 'User', value: 'user' },
				],
				default: 'tenant',
			},
			...gdap.description,
			...tenant.description,
			...user.description,
		],
	};

	methods = {
		loadOptions: {
			getDomainOptions,
			getGDAPRoleOptions,
			getLicenseOptions,
			getTenantOptions,
		}
	}
}
