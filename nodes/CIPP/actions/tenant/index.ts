import { INodeProperties } from "n8n-workflow";

import { domains } from "./domains";

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		noDataExpression: true,
		type: 'options',
		displayOptions: {
			show: { resource: ['tenant'], },
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get tenants',
				routing: {
					request: { url: "/ListTenants", },
				},
			},
			{
				name: 'Get Domains',
				value: 'getDomains',
				action: 'Get domains',
				routing: {
					request: { url: "/ListDomains", }
				},
			},
		],
		default: 'getAll',
	},
	...domains,
]
