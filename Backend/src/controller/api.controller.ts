import { Response,Request } from "express";
import {TestAPiModel,TestAPiInterface} from "../models/api.model";
import axios,{AxiosRequestConfig} from "axios"
class FetchController{
   public async APifetchroute(req:Request,res:Response):Promise<void>{
    const {userId,email,name,url,method,payload,headers} = req.body
     try {
      let savefetchedData;
      let requestOptions:AxiosRequestConfig;
      if(payload){
         savefetchedData = new TestAPiModel({
            userId,requestApi:url,method,payload
        })
        requestOptions = {
         method: method,
         headers: {
                ...headers,
           "Content-Type": "application/json",
         },
         data: payload,
         url:url
       };
      }else{
         savefetchedData = new TestAPiModel({
            userId,requestApi:url,method
        })  
        requestOptions = {
         method: method,
         headers: {
          ...headers,
           "Content-Type": "application/json",
         },
         url:url
       };
      }
        await savefetchedData.save()
      
        
          const response = await axios(requestOptions)
          res.status(200).send({data:response.data,name,email})
     } catch (error:any) {
      console.error(error)
        res.status(404).send({"msg":error.msg})
     }
   }
}

class getAllAPidata {
public  async GetallApisData(req:Request,res:Response):Promise<void>{
    try {
      const data:Array<TestAPiInterface> = await TestAPiModel.find({userId:req.body.userId})
      res.status(200).send({data})
    } catch (error:any) {
      res.status(404).send({"msg":error.msg})
    }
  }
  public async GetLoginuserdata(req:Request,res:Response):Promise<void>{
    const {email,name,userId} = req.body
    res.status(200).send({email,name,userId})
  }
}
export {FetchController,getAllAPidata}