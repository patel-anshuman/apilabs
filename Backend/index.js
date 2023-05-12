const express = require("express")
const app = express()
const cookieParser=require("cookie-parser")
require("dotenv").config()
const {connection} = require("./db.js")
const {UserRouter} = require("./routes/user.routes.js")
const {auth} = require("./middleware/auth.middleware.js")
const {fetchRouter} = require("./routes/fetch.routes.js")
const cors =require("cors")
// const {passport,flag,googlemailauth, email} = require("./middleware/google.auth.js")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
 const c_id="51f8f470acf4c4a14934"
 const client_secret="36ebc5fc85b8fbacd6bdd2aa78d5815b77917376"
app.use(cors())
app.use(express.json())
app.use(cookieParser())



    // app.get("/",(req,res)=>{
    //     res.send("Hey google")
    // })
    // app.get("/google",(req,res)=>{
    //     res.send("Hey goggle")
    // })
    // app.get("/gitlogin",(req,res)=>{
    //     res.sendFile(__dirname+"/github.html")
    // })
    // app.get("/auth/github",async(req,res)=>{
    //     const {code}=req.query
    //     console.log(code)
    //    const accessToken= await fetch("https://github.com/login/oauth/access_token",{
    //         method:"POST",
    //         headers:{
    //             Accept:"application/json",
    //             "content-type":"application/json"
    //         },
    //         body:JSON.stringify({
    //           client_id:c_id,
    //           client_secret:client_secret,
    //           code:code,  
    //         })
    //     }).then((res)=>res.json())
    //     const user=await fetch("https://api.github.com/user",{
    //         headers:{
    //             Authorization:`Bearer ${accessToken.access_token}`
    //         }
    //     }).then((res)=>res.json())
    //     const useremailis = await fetch("https://api.github.com/user/emails", {
    //         headers : {
    //             Authorization : `Bearer ${accessToken.access_token}`
    //         }
    //     })
    //     .then((res) => res.json())
    //     .catch((err) => console.log(err))
    
    //     console.log(useremailis)
    //     res.send("Sigin from github")
    // })
    
    //           /////Google///////
    // app.get("/",(req,res)=>{
    //   res.send("Hello from nodejs application")
    // })

    // app.get("/googlelogin",(req,res)=>{
    //   res.sendFile(__dirname+"/google.html")
    // })
    // app.get('/auth/google',
    //   passport.authenticate('google', { scope: ['profile','email'] }));
    
    // app.get('/auth/google/callback', 
    //   passport.authenticate('google', { failureRedirect: '/login' ,session:false}),
    //   function(req, res) {
    //     // Successful authentication, redirect home.
    //     console.log(req.user)
    //     res.redirect('/');
    //   });
    //   console.log(email)
//  if(email){
//       app.use(googlemailauth)
//       app.use("fetchroutes",fetchRouter)
// }else{
    app.use("/user",UserRouter)
    app.use(auth)
    app.use("/fetchroutes",fetchRouter)
// }











///listining
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Server is connected with mongodb")
    } catch (error) {
        console.log("Server is not connected with mongodb")
    }
    console.log(`listening on port : ${process.env.port}`)
})