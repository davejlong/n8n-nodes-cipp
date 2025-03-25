import { IDisplayOptions, IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties, NodePropertyTypes } from "n8n-workflow";

const displayOptions: IDisplayOptions = {
	show: {
		resource: ['user'],
		operation: ['create'],
	},
};

function option(displayName: string, name: string, type: NodePropertyTypes='string', incDisplayOptions: Boolean=true): INodeProperties {
	let nodeProperty: INodeProperties = {
		displayName: displayName,
		name: name,
		type: type,
		default: '',
		routing: {
			send: {
				property: name,
				type: 'body',
				value: "={{$value}}"
			}
		}
	}

	if (incDisplayOptions) {
		nodeProperty.displayOptions = displayOptions;
	}

	return nodeProperty;
}

export const addUser: INodeProperties[] = [
	{
		displayName: 'Tenant Name or ID',
		name: 'tenantFilter',
		displayOptions,
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTenantOptions',
		},
		routing: {
			send: {
				property: 'tenantFilter',
				type: 'body',
				value: "={{$value}}"
			}
		},
		default: '',
	},
	option("Display Name", 'displayName'),
	option('First Name', 'givenName'),
	option('Last Name', 'surName'),
	option("User Name", "username"),
	{
		// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
		displayName: 'Primary Domain',
		name: 'domain',
		type: 'options',
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		default: '',
		displayOptions,
		typeOptions: {
			loadOptionsDependsOn: ['tenantFilter'],
			loadOptionsMethod: 'getDomainOptions',
		},
		routing: {
			send: {
				property: 'domain',
				type: 'body',
				value: "={{$value}}",
			}
		}
	},
	{
		displayName: 'Usage Location',
		name: 'usageLocation',
		type: 'string',
		default: 'US',
		displayOptions,
		routing: {
			send: {
				preSend: [
					async function(this: IExecuteSingleFunctions, requestOptions: IHttpRequestOptions): Promise<IHttpRequestOptions> {
						const location = this.getNodeParameter('usageLocation');
						Object.assign(requestOptions.body, {
							usageLocation: { value: location, label: location },
						});
						return requestOptions;
					}
				],
			},
		},
	},
	{
		displayName: 'Licenses Names or IDs',
		name: 'licenses',
		type: 'multiOptions',
		description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		default: [],
		displayOptions,
		typeOptions: {
			loadOptionsDependsOn: ['tenantFilter'],
			loadOptionsMethod: 'getLicenseOptions',
		},
		routing: {
			send: {
				property: 'licenses.value',
				propertyInDotNotation: true,
				type: 'body',
				value: "={{$value}}",
			},
		},
	},
	{
		displayName: 'Automatic Password',
		description: 'Whether or not to automatically generate a password',
		name: 'autoPassword',
		type: 'boolean',
		displayOptions,
		default: true,
		routing: {
			send: {
				property: 'autoPassword',
				type: 'body',
				value: "={{$value}}"
			},
		},
	},
	{
		displayName: 'Must Change Password',
		description: 'Whether or not to require user to change their password on next login',
		name: 'mustChangePass',
		type: 'boolean',
		displayOptions,
		default: true,
		routing: {
			send: {
				property: 'mustChangePass',
				type: 'body',
				value: "={{$value}}",
			},
		},
	},
	{
		displayName: 'Copy From',
		description: 'Specifies the user to copy settings from',
		name: 'copyFrom',
		type: 'string',
		default: '',
		displayOptions,
		routing: {
			send: {
				property: 'copyFrom',
				type: 'body',
				value: "={{$value}}",
			}
		}
	},
	{
		displayName: 'Additional Attributes',
		name: 'attributes',
		type: 'collection',
		placeholder: 'Add Attribute',
		displayOptions,
		default: {},
		options: [
			{
				displayName: 'Business Phone',
				name: 'businessPhone',
				default: '',
				type: 'string',
				routing: {
					send: {
						property: 'businessPhone',
						type: 'body',
						value: "={{$value}}",
					},
				},
			},
			{
				displayName: 'City',
				name: 'city',
				default: '',
				type: 'string',
				routing: {
					send: {
						property: 'city',
						type: 'body',
						value: "={{$value}}",
					},
				},
			},
			{
				displayName: 'Company Name',
				name: 'companyName',
				default: '',
				type: 'string',
				routing: {
					send: {
						property: 'companyName',
						type: 'body',
						value: "={{$value}}",
					},
				},
			},
			{
				displayName: 'Country',
				name: 'country',
				default: '',
				type: 'string',
				routing: {
					send: {
						property: 'country',
						type: 'body',
						value: "={{$value}}",
					},
				},
			},
			{
				displayName: 'Department',
				name: 'department',
				default: '',
				type: 'string',
				routing: {
					send: {
						property: 'department',
						type: 'body',
						value: "={{$value}}",
					},
				},
			},
			{
				displayName: 'Job Title',
				name: 'jobTitle',
				default: '',
				type: 'string',
				routing: {
					send: {
						property: 'jobTitle',
						type: 'body',
						value: "={{$value}}",
					},
				},
			},
			{
				displayName: 'Mobile Phone',
				name: 'mobilePhone',
				default: '',
				type: 'string',
				routing: {
					send: {
						property: 'mobilePhone',
						type: 'body',
						value: "={{$value}}",
					},
				},
			},
			{
				displayName: 'Postal Code',
				name: 'postalCode',
				default: '',
				type: 'string',
				routing: {
					send: {
						property: 'postalCode',
						type: 'body',
						value: "={{$value}}",
					},
				},
			},
			{
				displayName: 'Street Address',
				name: 'streetAddress',
				default: '',
				type: 'string',
				routing: {
					send: {
						property: 'streetAddress',
						type: 'body',
						value: "={{$value}}",
					},
				},
			},
			{
				displayName: 'Manager',
				name: 'setManager',
				default: '',
				type: 'string',
				description: 'User Principal Name of new users manager',
				placeholder: 'john@example.com',
				routing: {
					send: {
						propertyInDotNotation: true,
						property: 'setManager.value',
						type: 'body',
						value: "={{$value}}",
					},
				},
			}
		],
	},
];
