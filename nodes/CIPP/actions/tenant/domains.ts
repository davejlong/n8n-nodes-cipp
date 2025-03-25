import { INodeProperties } from "n8n-workflow";

export const domains: INodeProperties[] = [
	{
		displayName: 'Tenant Name or ID',
		name: 'tenantId',
		displayOptions: {
			show: {
				resource: ['tenant'],
				operation: ['getDomains'],
			},
		},
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTenantOptions',
			loadOptionsDependsOn: ['includeBlank'],
			loadOptionsParameters: {
				includeBlank: false,
			},
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
];
