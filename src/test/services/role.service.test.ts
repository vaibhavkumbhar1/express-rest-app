import { RoleService } from '../../services/role.service';
import { Role } from '../../model/role/role.model';


const roleService:RoleService=new RoleService();
describe("Testing Roles Service Operations", ()=>{
    afterAll(async ()=>{
        await roleService.roleRepository.client.shutdown();
   })


    test("1. Should create role witt all role data", async ()=>{
       
        let permission:Set<string>=new Set();
        permission.add("read").add("write")

        let role:Role={
            roleName:"TEST_ROLE",
            tenantId: "testTenant",
            appId:"5bc2244a-359b-11ec-8d3d-0242ac130003",
            isActive:true,
            IsDeleted: false,
            roleId: "",
            permissions: null,
            canGrantToUsers:true,
            canGrantToApps:true,
            managedBy:"5bc2244a-359b-11ec-8d3d-0242ac130003"   

        };
        const result=await roleService.createRole(role) 

        expect(result).toHaveProperty("id", expect.stringMatching( `Platform:Role:${role.appId}:${role.roleName}`))

    })


})