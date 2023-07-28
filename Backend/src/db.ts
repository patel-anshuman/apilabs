const mongoose = require("mongoose")
import dotenv from 'dotenv';
dotenv.config();
class Database{
    private static instance:Database;
    private mongoUrl : string;
    constructor(){
        this.mongoUrl =`${process.env.mongourl}`;
        this.connect();
    }
    public static getInstance():Database{
        if(!Database.instance){
        Database.instance=new Database()
        }
        return Database.instance
    }
    private async connect():Promise<void> {
        try {
            await mongoose.connect(this.mongoUrl,{
                useNewUrlParser: true,
        useUnifiedTopology: true
            });
            console.log("Connected to MongoDB")
        } catch (error:any) {
            console.log("Error connecting to MongoDB:",error.message)
            process.exit(1);
        }
    }
}

export default Database