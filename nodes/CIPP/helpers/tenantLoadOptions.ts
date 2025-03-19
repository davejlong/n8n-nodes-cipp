import { ILoadOptions } from "n8n-workflow";

export const tenantLoadOption: ILoadOptions = {
	routing: {
		request: {
			url: '/ListTenants',
			method: 'GET',
		},
		output: {
			postReceive: [
				{
					type: 'setKeyValue',
					properties: {
						name: "={{$responseItem.displayName}}",
						value: "={{$responseItem.customerId}}",
					},
				},
				{
					type: 'sort',
					properties: {
						key: 'name',
					},
				},
			],
		},
	},
}
