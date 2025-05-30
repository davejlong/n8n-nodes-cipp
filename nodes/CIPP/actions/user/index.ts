import { INodeProperties } from "n8n-workflow";

import { addUser } from './add';

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		noDataExpression: true,
		type: 'options',
		displayOptions: {
			show: { resource: ['user'], },
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get users',
				routing: {
					request: { url: "/ListUsers", },
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create user',
				routing: {
					request: {
						// baseURL: 'https://eomglhueikotny6.m.pipedream.net',
						url: '/AddUser',
						method: 'POST'
					}
				}
			}
		],
		default: 'getAll',
	},
	{
		displayName: 'Tenant Name or ID',
		name: 'tenantId',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getAll'],
			},
		},
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTenantOptions',
		},
		routing: {
			send: {
				property: 'tenantFilter',
				type: 'query',
				value: "={{$value}}",
			},
		},
		default: '',
	},
	{
		displayName: 'Graph Filter',
		name: 'graphFilter',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getAll'],
			},
		},
		description: 'Graph filter to apply to search',
		routing: {
			send: {
				property: 'graphFilter',
				type: 'query',
				value: "={{$value}}",
			},
		},
		default: '',
	},
	...addUser,
]
