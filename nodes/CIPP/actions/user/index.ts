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
					request: {
						url: "/ListGraphRequest",
						qs: {
							endpoint: "users",
							"$count": true,
						},
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: { property: 'Results' },
							},
						],
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create user',
				routing: {
					request: {
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
	// {
	// 	displayName: 'Include Logon Details',
	// 	name: 'logonDetails',
	// 	type: 'boolean',
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['user'],
	// 			operation: ['getAll'],
	// 		},
	// 	},
	// 	routing: {
	// 		send: {
	// 			property: 'includeLogonDetails',
	// 			type: 'query',
	// 			value: "={{$value}}",
	// 		},
	// 	},
	// 	description: 'Whether or not to include logon details (last logon date, etc.) with users',
	// 	default: false,
	// },
	...addUser,
]
