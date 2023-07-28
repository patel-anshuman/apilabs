import { UserModel, UserInterface } from "../models/user.model";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config()
import { CookieOptions, Request, Response } from "express";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import { client } from "../redis";

class UserController {
  public async Register(req: Request, res: Response): Promise<void> {
    try {
      const { password } = req.body;
      const hash: string = bcrypt.hashSync(password, 8);
      const newUser = new UserModel({
        ...req.body,
        password: hash,
      });
      await newUser.save();
      res.status(200).send({ msg: "Register successfully", user: newUser });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  
  public async Login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user: UserInterface | null = await UserModel.findOne({ email });
      if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
      const isPasswordValid: boolean = bcrypt.compareSync(
        password,
        user.password
      );
      if (!isPasswordValid) {
        res.status(401).json({ error: "Invalid Password" });
      }
      const token: string = jwt.sign(
        {
          userId: user._id,
          name: user.name,
          email: user.email,
        },
        `${process.env.JWT_ACCESS_TOKEN_SECRET_KEY}`,
        { expiresIn: "1h" }
      );
      const refresh: string = jwt.sign(
        {
          userId: user._id,
          name: user.name,
          email: user.email,
        },
        `${process.env.JWT_REFRESH_TOKEN_SECRET_KEY}`,
        { expiresIn: "2h" }
      );

      client.mset("token",token,"EX",3600,"refresh",refresh,"EX",7200)
console.log(await client.get("token"),await client.get("refresh"))  //checking
     
      res.status(200).send({ msg: "Login Successfully", token, refresh });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  public async Logout(req:Request,res:Response):Promise<void> {
     
     try {
      client.del(["token","refresh"])
console.log(await client.get("token"),await client.get("refresh"))  //checking

      res.status(201).send({"msg":"Logout Succesfully"})
     } catch (error:any) {
      res.status(500).json({ error: error.message });
     }
  }
  public async  GenrateNewToken(req:Request,res:Response):Promise<void> {
   const refresh:string= await client.get("refresh")
    try {
      if(refresh===null){
        console.log("HereBlacklist")
        res.status(400).send({msg:"Please login"})
    }
    jwt.verify(refresh,`${process.env.JWT_REFRESH_TOKEN_SECRET_KEY}`,(err:any,decoded:any)=>{   
      if(decoded){
    const newToken:string|JsonWebKey = jwt.sign( {userId:decoded._id,email:decoded.email,},`${ process.env.JWT_ACCESS_TOKEN_SECRET_KEY}`,{expiresIn:"1h"})
      client.set("token",newToken,"EX",3600)
      } 
      })
console.log(await client.get("token"),await client.get("refresh"))  ///checking

      res.status(200).send({"msg":"New token has been set"})
    } catch (error:any) {
      res.status(500).json({ error: error.message });
      
    }
  }
}
export default UserController;
