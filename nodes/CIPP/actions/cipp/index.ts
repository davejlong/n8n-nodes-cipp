import { INodeProperties } from "n8n-workflow";

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		noDataExpression: true,
		type: 'options',
		displayOptions: {
			show: { resource: ['cipp'], },
		},
		options: [
			{
				name: 'Get Version',
				value: 'getVersion',
				action: 'Get version',
				routing: {
					request: { url: "/getversion", },
				},
			},
		],
		default: 'getVersion',
	}
]
