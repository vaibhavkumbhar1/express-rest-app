import express, { Request, Response } from "express";
import { NextFunction } from 'express';
import { isNewExpression } from "typescript";
import { Role } from '../model/role/role.model';
import { RoleService } from '../services/role.service';
import { getTenantId } from "../utils/request-utils";


export const rolesRouter = express.Router();
const roleService=new RoleService();

rolesRouter.post("/", async (req:Request, res:Response, next:NextFunction) =>{

    let role:Role=req.body
   

    try {
        const result= await roleService.createRole(role);

        console.log(result)

        res.status(201).json(result);
    } catch (error:Error|any | unknown) {
        console.log(`Error occurred: ${error.message}, status: ${error.status}`);
		next(error);
    }

  
    
});


rolesRouter.get("/", async (req, res, next) => {
    try {
        let result=await roleService.getAllRoles();

        res.status(200).json(result);
        next();
    } catch (error:Error|any | unknown) {
        console.log(`Error occurred: ${error.message}, status: ${error.status}`);
		next(error);
    }
    
})


rolesRouter.get("/app/:appId/",async (req, res,next) =>{

    try {
        let reqParams=req.params;
        let tenantId=getTenantId(req)
        let result=await roleService.getAllAppRoles(tenantId, reqParams.appId);

        
        res.status(200).json(result);
       next();

    } catch (error) {
    
        next(error);
    }
})