import { INodeProperties } from "n8n-workflow";

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
			}
		],
		default: 'getAll',
	},
	{
		displayName: 'Tenant ID',
		name: 'tenantId',
		displayOptions: {
			show: { resource: ['user'], },
		},
		type: 'string',
		// type: 'options',
		// typeOptions: {
		// 	loadOptions: {
		// 		routing: {
		// 			request: {
		// 				method: 'GET',
		// 				url: '/ListTenants',
		// 			},
		// 			output: {
		// 				postReceive: [
		// 					{
		// 						type: 'setKeyValue',
		// 						properties: {
		// 							name: '={{$responseItem.displayName}}',
		// 							value: '={{$responseItem.customerId}}',
		// 						},
		// 					},
		// 					{
		// 						type: 'sort',
		// 						properties: {
		// 							key: 'name',
		// 						},
		// 					},
		// 				],
		// 			},
		// 		},
		// 	},
		// },
		routing: {
			request: {
				qs: { tenantfilter: "={{$value}}" }
			},
		},
		default: '',
	}
]
