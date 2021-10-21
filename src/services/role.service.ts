import { throwable } from 'ts-throwable';
import { Role } from '../model/role/role.model';
import { RoleRepository } from '../repository/role.repository';


export class RoleService {
    roleRepository: RoleRepository;

    constructor() {
        this.roleRepository = new RoleRepository();
    }


    async createRole(role: Role): Promise<{ [key: string]: any } & throwable<Error>> {


        try {
            var roleId = `Platform:Role:${role.appId}:${role.roleName}`;
            await this.roleRepository.save(
                {
                    ...role,
                    roleId: roleId
                }


            );
        } catch (error) {
            throw error;
        }
        return { id: roleId };
    }



    async getAllRoles(): Promise<Role[] & throwable<Error>> {
        try {

            let result = await this.roleRepository.getAllRoles();

            return result as Role[];
        } catch (error) {
            throw error;
        }
    }

    async getAllAppRoles(tenantId: string, appId: string): Promise<Role[] & throwable<Error>> {
        try {

            let result = await this.roleRepository.findByTenantIdAndAppIdV1(tenantId, appId);
            //console.log("🚀 ~ file: role.service.ts ~ line 50 ~ RoleService ~ getAllAppRoles ~ result", result)


            return result as Role[];
        } catch (error) {
            throw error;
        }
    }



}