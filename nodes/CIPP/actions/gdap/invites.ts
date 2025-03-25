import { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties, jsonParse } from "n8n-workflow";
import { cippGetRequest } from "../../methods/helpers";

export const invites: INodeProperties[] = [
	{
		displayName: 'Relationship ID',
		name: 'relationshipId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['gdap'],
				operation: ['getInvites'],
			},
		},
		routing: {
			request: {
				qs: { RelationshipId: "={{$value}}", },
			},
		},
	},

	{
		displayName: 'Use All Existing Roles',
		name: 'useAllExistingRoles',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['gdap'],
				operation: ['createInvite'],
			},
		},
		routing: {
			send: {
				preSend: [
					async function(this: IExecuteSingleFunctions, requestOptions: IHttpRequestOptions): Promise<IHttpRequestOptions> {
						const gdapRoles = await cippGetRequest.call(this, '/ListGDAPRoles');
						Object.assign(requestOptions.body, { roleMappings: gdapRoles });
						return requestOptions;
					}
				]
			}
		},
	},
	{
		displayName: 'GDAP Roles Names or IDs',
		name: 'gdapRoles',
		description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		default: [],
		type: 'multiOptions',
		typeOptions: {
			loadOptionsMethod: 'getGDAPRoleOptions',
		},
		displayOptions: {
			show: {
				resource: ['gdap'],
				operation: ['createInvite'],
			},
			hide: {
				useAllExistingRoles: [true],
			}
		},
		routing: {
			send: {
				preSend: [
					async function(this: IExecuteSingleFunctions, requestOptions: IHttpRequestOptions): Promise<IHttpRequestOptions> {
						const gdapRoles = this.getNodeParameter('gdapRoles') as string[];
						const roleMappings = gdapRoles.map(role => jsonParse(role));
						Object.assign(requestOptions.body, { roleMappings: roleMappings });
						return requestOptions;
					}
				],
			},
		},
	},
];
