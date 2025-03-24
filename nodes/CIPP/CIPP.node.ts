import { INodeType, INodeTypeDescription } from "n8n-workflow";

import { getTenantOptions } from "./methods/loadOptions";

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
					{ name: 'Tenant', value: 'tenant' },
					{ name: 'User', value: 'user' },
				],
				default: 'tenant',
			},
			...tenant.description,
			...user.description,
		],
	};

	methods = {
		loadOptions: {
			getTenantOptions,
		}
	}
}
