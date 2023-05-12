
const name=document.getElementsByClassName("name")
    const heading=document.getElementsByClassName("heading")
    const text=document.getElementsByClassName("text")

const workspace_name= document.getElementById("user-name")
const workspace_email =  document.getElementById("user-email")

fetch("http://localhost:8887/fetchroutes/getuserdata").then((res)=>res.json()).then((userdata)=>{
    console.log(userdata)
if(workspace_email&&workspace_name){
    workspace_name.innerText = userdata.name;
    workspace_email.innerText = userdata.email;
}
else if (name&&heading&&text){
    name[0].innerText=userdata?.name[0]
    heading[0].innerText=userdata?.name
    text[0].innerText=userdata?.email
}
})