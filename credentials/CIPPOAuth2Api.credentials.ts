import { Icon, ICredentialTestRequest, ICredentialType, INodeProperties } from "n8n-workflow";

export class CIPPOAuth2Api implements ICredentialType {
	name = 'cippOAuth2Api';
	displayName = 'CIPP OAuth2 API';
	documentationUrl = 'https://github.com/davejlong/n8n-nodes-cipp';
	icon: Icon = "file:cipp.png";

	extends = ['microsoftOAuth2Api'];

	properties: INodeProperties[] = [
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'clientCredentials',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: '=api://{{ $self["clientId"] }}/.default',
		},
		// We aren't going to use the authorization URL, but if we don't set it, n8n
		// will show the field from the MicrosoftOAuth2Api class
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden',
			default: '=https://login.microsoftonline.com/{{ $self["tenantId"] }}/oauth2/v2.0/authorize',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: '=https://login.microsoftonline.com/{{ $self["tenantId"] }}/oauth2/v2.0/token',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'body',
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
		{
			displayName: 'Tenant ID',
			name: 'tenantId',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'CIPP API URL',
			name: 'cippApiUrl',
			type: 'string',
			default: '',
			required: true,
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: "={{$credentials.cippApiUrl}}/api",
			url: '/GetVersion',
			method: 'GET',
		}
	}
}
