import { NextFunction, Request, Response } from "express";

var express = require('express')
var userRouter = express.Router()


userRouter.use(function timeLog(req: Request, res: Response, next: NextFunction) {


    console.log("Time: " + Date.now())

    next();
})


userRouter.get("/:userId", (req: Request, res: Response, next: NextFunction): void => {


    res.send(req.params);
    next();
})

export default userRouter