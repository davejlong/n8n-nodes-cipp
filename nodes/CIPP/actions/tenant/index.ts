import { INodeProperties } from "n8n-workflow";

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
			{
				name: 'Get Licenses',
				value: 'getLicenses',
				action: 'Get licenses',
				routing: {
					request: { url: "/ListLicenses", }
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Tenant Name or ID',
		name: 'tenantId',
		displayOptions: {
			show: {
				resource: ['tenant'],
				operation: ['getDomains', 'getLicenses'],
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
]
