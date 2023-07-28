
const txtname=document.getElementsByClassName("name")
    const heading=document.getElementsByClassName("heading")
    const text=document.getElementsByClassName("text")

const workspace_name= document.getElementById("user-name")
const workspace_email =  document.getElementById("user-email")

fetch(`${baseurl}/api/loginUserdata`).then((res)=>res.json()).then((userdata)=>{
    console.log(userdata)
if(workspace_email&&workspace_name){
    workspace_name.innerText = userdata.name;
    workspace_email.innerText = userdata.email;
}
else if (heading&&text){
    txtname[0].innerText=userdata?.name[0];
    heading[0].innerText=userdata?.name;
    text[0].innerText=userdata?.email;
}
})