import { IHttpRequestOptions, ILoadOptionsFunctions, INodePropertyOptions, NodeOperationError } from "n8n-workflow";

export async function getTenantOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const credentials = await this.getCredentials('cippOAuth2Api');

	const requestOptions:IHttpRequestOptions = {
		method: 'GET',
		url: `${credentials.cippApiUrl}/api/ListTenants`,
	};

	this.logger.debug(`[CIPP] Options Request`, requestOptions);

	const responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'cippOAuth2Api', requestOptions);

	if (responseData == undefined) {
		throw new NodeOperationError(this.getNode(), `No data returned from ${requestOptions.url}`);
	}

	const returnData: INodePropertyOptions[] = [];
	for (const data of responseData) {
		returnData.push({
			name: data.displayName,
			value: data.customerId
		})
	}
	return returnData;
}
