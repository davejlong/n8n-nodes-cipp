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
			}
		],
		default: 'getAll',
	}
]
