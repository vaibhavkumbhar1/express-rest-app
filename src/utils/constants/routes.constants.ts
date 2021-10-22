import config from 'config';

export const CONTEXT_PATH:string=config.get("server.contextPath");

export const APP_ROUTE= CONTEXT_PATH+"/apps"


//Roles Routes
export const ROLES_ROUTE='/roles';
export const APP_ROLES_ROUTE="/app/:appId/roles";
export const ROLE_BY_ID_ROUTE=APP_ROLES_ROUTE+"/:roleId"



export const USERS_ROUTE=CONTEXT_PATH+"/users";