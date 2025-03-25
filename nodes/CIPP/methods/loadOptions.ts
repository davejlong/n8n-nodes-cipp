import { ILoadOptionsFunctions, INodePropertyOptions } from "n8n-workflow";
import { getLoadOptions } from "./helpers";

export async function getTenantOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	return await getLoadOptions.call(this, '/ListTenants', 'displayName', 'customerId')
}

export async function getGDAPRoleOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	return await getLoadOptions.call(this, '/ListGDAPRoles', 'RoleName');
}
