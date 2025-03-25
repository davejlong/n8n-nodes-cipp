import { IAllExecuteFunctions, IHttpRequestOptions, ILoadOptionsFunctions, INodePropertyOptions, jsonStringify, NodeOperationError } from "n8n-workflow"

export async function cippGetRequest(this: IAllExecuteFunctions, endpoint: string): Promise<any> {
	const credentials = await this.getCredentials('cippOAuth2Api');

	const requestOptions: IHttpRequestOptions = {
		method: 'GET',
		baseURL: `${credentials.cippApiUrl}/api`,
		url: endpoint
	};
	const responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'cippOAuth2Api', requestOptions);

	if (responseData == undefined) {
		throw new NodeOperationError(this.getNode(), `No data returned from ${requestOptions.url}`);
	}
	return responseData;
}

export async function getLoadOptions(this: ILoadOptionsFunctions, endpoint: string, nameKey: string, valueKey?: string): Promise<INodePropertyOptions[]> {
	const responseData = await cippGetRequest.call(this, endpoint);

	const returnData: INodePropertyOptions[] = [];
	for(const data of responseData) {
		returnData.push({
			name: data[nameKey],
			value: (valueKey ? data[valueKey] : jsonStringify(data)),
		});
	}

	return returnData;
}

