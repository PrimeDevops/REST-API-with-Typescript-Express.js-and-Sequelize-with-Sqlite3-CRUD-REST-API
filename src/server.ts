import express, { NextFunction, Request, Response } from 'express';
import db from "./config/database.config";
import { v4 as UUIDV4 } from 'uuid';
//import { UUIDV4 } from 'sequelize';
import { TodoInstance } from '../model';
import TodoValidator from "../validator"
import middleware from '../middleware';


db.sync().then(()=>{
    console.log('Connect to db...')
});

const app = express();
const port = 9000;

app.use(express.json());

/* app.get("/", (req: Request, res: Response)=>{ 
    return res.send('REST_API - CRUD')
}); */

app.post(
    "/create", 
    TodoValidator.checkCreateTodo(),
    middleware.handleValidationError,
     

);
 
app.get("/read", TodoValidator.checkReadTodo(), middleware.handleValidationError,  async (req: Request, res: Response)=>{
    try{
        const limit = req.query?.limit as number | undefined;
        const offset = req.query?.limit as number | undefined;
        
        const records = await TodoInstance.findAll({ where: {}, limit, offset })
        return res.json(records);
        
    }catch(e){
        return res.json({ msg: 'fail to read', status: 500, route: '/read' })
    }
});



app.get("/read/:id", TodoValidator.checkIdParam(), middleware.handleValidationError,

/* TodoValidator.checkReadTodo(),
 middleware.handleValidationError,  */ 

 async (req: Request, res: Response)=>{
    try{
        const { id } = req.params;
        const record = await TodoInstance.findOne({ where: { id }});
        return res.json(record);
        
        
    }catch(e){
        return res.json({ msg: 'fail to read', status: 500, route: '/read/:id' })
    }
});




 app.put('/update/:id', 
async(req: Request, res: Response, )=>{
    try{
        const { id } = req.params;
        const record = await TodoInstance.findOne({ where: { id }});

        if(!record){
            return res.json({ msg: "Can not find existing record ..."})

        }
        const updatedRecord = await record.update({ completed : !record.getDataValue('completed')});
        return res.json({ updatedRecord});



    }catch(e){
        return res.json({ msg: "fail to update", status: 500, route: '/update/:id'})

    }
}) 



 app.delete('/delete/:id', 
async(req: Request, res: Response, )=>{
    try{
        const { id } = req.params;
        const record = await TodoInstance.findOne({ where: { id }});

        if(!record){
            return res.json({ msg: "Can not find existing record ..."})

        }
        const deletedRecord = await record.destroy();
        return res.json({ deletedRecord});



    }catch(e){
        return res.json({ msg: "fail to update", status: 500, route: '/delete/:id'})

    }
}) 

app.listen(port, ()=>{
    console.log('server is running on port ' + port)
});