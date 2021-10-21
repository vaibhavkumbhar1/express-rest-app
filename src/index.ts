import express, { Application, Errback, ErrorRequestHandler, Request, Response, Router } from 'express';
import userRouter from './routes/user.routes'
import { NextFunction } from 'express';
import { rolesRouter } from './routes/role.routes';
import config from 'config';
const app: Application = express();
const router: Router = express.Router();


router.get('/', (req: Request, res: Response): void => {
  res.send('Hello, World');
});


router.get("/home", (req, res, next):void =>{


    res.json({id:"12345", page:"home"})

    next();
})


app.use(express.json());

app.use(router);
app.use("/user", userRouter);
app.use("/role", rolesRouter);

app.use(function (err:Error, req:Request, res:Response, next:NextFunction){
    console.error(err.stack)
    res.status(500).send('Something broke!\nError: '+ err.message )
}
)

console.log('The Server is listening on the port '+config.get("server.port") );
const server=app.listen(config.get("server.port"));




//Gracefully shutdown nodejs
process.on('SIGTERM', () => {
    
  
  console.log('SIGTERM signal received: closing HTTP server')
    server.close(() => {
      console.log('HTTP server closed')
    })
  })


