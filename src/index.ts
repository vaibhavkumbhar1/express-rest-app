import express, { Application, Errback, ErrorRequestHandler, Request, Response, Router } from 'express';
import userRouter from './routes/user.routes'
import { NextFunction } from 'express';
import { rolesRouter } from './routes/role.routes';
const app: Application = express();
const router: Router = express.Router();

router.get('/', (req: Request, res: Response): void => {
    res.send('Hello, World');
});



router.get("/home", (req, res, next):void =>{


    res.json({id:"12345", name:"Vaibhav"})

    next();
})

router.use(function (req, res, next) {
    console.log('Router middleware Time:', Date.now())
    next()
  })
  

app.use(function myLogger(req, res, next){
    console.log("Request pAth: "+req.path, "Req Query: ",req.query);

    console.log()

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

console.log('The Server is listening on the port 3000');
const server=app.listen(3000);



process.on('SIGTERM', () => {
    
  
  console.log('SIGTERM signal received: closing HTTP server')
    server.close(() => {
      console.log('HTTP server closed')
    })
  })


