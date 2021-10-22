import config from 'config';
import express, { Application, NextFunction, Request, Response, Router } from 'express';
import { rolesRouter } from './routes/role.routes';
import userRouter from './routes/user.routes';
import { CONTEXT_PATH, USERS_ROUTE } from './utils/constants';
const app: Application = express();
const router: Router = express.Router();


router.get('/', (req: Request, res: Response): void => {
  res.send('Hello, World');
});


router.get(CONTEXT_PATH, (req, res, next):void =>{


    res.json({appName:"AAA", page:CONTEXT_PATH})

    next();
})


app.use(express.json());

app.use(router);
app.use(USERS_ROUTE, userRouter);
app.use(CONTEXT_PATH, rolesRouter);

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


