import { INodeProperties } from "n8n-workflow";

import { invites } from './invites';

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		noDataExpression: true,
		type: 'options',
		displayOptions: {
			show: { resource: ['gdap'], },
		},
		options: [
			{
				name: 'Get Invites',
				value: 'getInvites',
				action: 'Get GDAP invites',
				routing: {
					request: { url: '/ListGDAPInvite', },
				},
			},
			{
				name: 'Get Roles',
				value: 'getRoles',
				action: 'Get GDAP roles',
				routing: {
					request: { url: '/ListGDAPRoles'}
				}
			},
			{
				name: 'Create GDAP Invite',
				value: 'createInvite',
				action: 'Create GDAP invite',
				routing: {
					request: {
						url: '/ExecGDAPInvite',
						method: 'POST',
					},
				},
			},
		],
		default: 'getInvites'
	},
	...invites,
];
