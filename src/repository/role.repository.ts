import { client as db, client } from '../db/client';
import cassandra from 'cassandra-driver';
import { throwable } from 'ts-throwable';
import { Role } from '../model/role/role.model';
import { rolesRouter } from '../routes/role.routes';


export class RoleRepository {
    client: cassandra.Client
    mapper: cassandra.mapping.Mapper;

    constructor() {
        this.client = db;
        const mappingOptions = {
            models: {
                'Role': {
                    tables: ['role']
                }
            }
        };
        this.mapper=new cassandra.mapping.Mapper(client, mappingOptions);
    }

    async save(role: Role): Promise<void & throwable<Error>> {

        const columns = Object.keys(role);
        const params = Object.values(role);
        const placeholders = Object.keys(role)
            .map(() => `?`)
            .join(", ");


        const query = `INSERT INTO role (${columns}) VALUES (${placeholders}) IF NOT EXISTS`;

        try {
            var result = await client.execute(query, params, {
                prepare: true
            });
            if (result.rows[0].get("[applied]") === false) {
                throw new Error("Role already exists");
            }
        } catch (error) {
            const errorMessage = `Error while registering role: ${(error as Error).message}`;

            throw new Error(errorMessage);

        }
    }




    async saveV1(role: Role): Promise<void & throwable<Error>> {

        

        

        try {
            const rolesMapper = this.mapper.forModel('Role');

           let result= await rolesMapper.insert(role);

           console.log("🚀 ~ file: role.repository.ts ~ line 63 ~ RoleRepository ~ saveV1 ~ result", result)

           
        } catch (error) {
            const errorMessage = `Error while registering role: ${(error as Error).message}`;

            throw new Error(errorMessage);

        }
    }

    getAllRoles = async (): Promise<{ [key: string]: any } & throwable<Error>> => {

        const query = `Select * from role`;

        try {
            var result = await client.execute(query);
            return result.rows;
        } catch (error) {
            const errorMessage = `Error while retriving registered apps: ${(error as Error).message}`;
            throw new Error(errorMessage);
        }

    };

    async findByTenantIdAndAppId(tenantId: string, appId: string): Promise<{ [Key: string]: any } & throwable<Error>>{
        const query = `Select * from role where tenantid=${tenantId} and appid=${appId}`;

        try {
            var result = await client.execute(query);
            return result.rows;
        } catch (error) {
            const errorMessage = `Error while retriving registered apps: ${(error as Error).message}`;
            throw new Error(errorMessage);
        }
    }


    async findByTenantIdAndAppIdV1(tenantId: string, appId: string): Promise<{ [Key: string]: any } & throwable<Error>>{

        try {
            /* const mappingOptions = {
                models: {
                    'Role': {
                        tables: ['role']
                    }
                }
            };
            var Mapper=cassandra.mapping.Mapper;
            // Create the Mapper using the mapping options
            const mapper = new Mapper(client, mappingOptions); */

            const rolesMapper = this.mapper.forModel('Role');

            //TODO: need to add column mapping e.g. UnderscoreCqlToCamelCaseMappings
            const roles= await rolesMapper.find({tenantid: tenantId, appid: appId})

            console.log("🚀 ~ file: role.repository.ts ~ line 88 ~ RoleRepository ~ findByTenantIdAndAppIdAndRoleId ~ roles", roles.toArray())

            return roles;
        } catch (error) {
            const errorMessage = `Error while retriving registered apps: ${(error as Error).message}`;
            throw new Error(errorMessage);
        }
    }


}