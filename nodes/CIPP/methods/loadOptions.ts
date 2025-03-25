import { ILoadOptionsFunctions, INodePropertyOptions } from "n8n-workflow";
import { getLoadOptions } from "./helpers";

export async function getTenantOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	return await getLoadOptions.call(this, '/ListTenants', 'displayName', 'customerId')
}

export async function getGDAPRoleOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	return await getLoadOptions.call(this, '/ListGDAPRoles', 'RoleName');
}

export async function getDomainOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const tenantFilter = this.getCurrentNodeParameter('tenantFilter');
	const options = await getLoadOptions.call(this, '/ListDomains', 'id', 'id', {tenantFilter: tenantFilter});
	return options;

}
