import { REQUEST_ID_HEADER, TENANT_ID_HEADER } from './constants';

export const getRequestId = (requestObj: { [key: string]: any }) => {
	const requestId = requestObj.headers[REQUEST_ID_HEADER.toLowerCase()];
	return requestId;
};


export const getTenantId = (requestObj: { [key: string]: any }) => {
	const tenantId = requestObj.headers[TENANT_ID_HEADER.toLowerCase()];
	return tenantId;
};