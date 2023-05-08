const body_type  = document.getElementById("body-data-type")
const payload = document.getElementById("body-input-area")
const send_btn = document.getElementById("send-btn") 
const method = document.getElementById("method")
const url = document.getElementById("url")
const work_title = document.querySelector("#work-title")
const response_body = document.getElementById("response-body")
  send_btn.addEventListener("click",e=>{
        e.preventDefault()
        const splitpayload = payload.value
        // const parsepayload = JSON.parse(splitpayload)
        console.log(splitpayload)
    //     if(body_type.value="JSON"){
    //    for(let i=0;i<=splitpayload.length-1;i++){
    //     if(splitpayload[0]!=="{"||splitpayload[splitpayload.length-1]!=="}"){
          
    //         console.log(false)
    //         return
    //     }
    //      if(i>=1&&i<splitpayload.length-1){
    //       let forchekingStr=splitpayload[i].split("")
    //       if(i===splitpayload.length-3){
    //         console.log(forchekingStr)
    //        if(forchekingStr[forchekingStr.length-1]!==`"`){
    //         console.log("For loop for false"+" : arr here")
    //         return false
    //     }
    //       }else{
    //         frocheckingstr(forchekingStr)
    //       }
    //      }
    //      console.log(true)
    //      return true
    //    }
    // }
   if(splitpayload){
    obj={
      method:method.value,
      payload:JSON.parse(splitpayload),
      url:url.value,
      }
   }else{
    obj={
      method:method.value,
      url:url.value,
      }
   }

   if(method.value==="GET"){
    
    work_title.innerHTML = `<p><span style="color: green;">${method.value}</span> ${url.value}</p>`;
   }else if(method.value==="POST"){
    
    work_title.innerHTML = `<p><span style="color: orange;">${method.value}</span> ${url.value}</p>`;
   }    
   else if(method.value==="PUT"){
    
    work_title.innerHTML = `<p><span style="color: blue;">${method.value}</span> ${url.value}</p>`;
   }    
   else if(method.value==="PATCH"){
    
    work_title.innerHTML = `<p><span style="color: darkblue;">${method.value}</span> ${url.value}</p>`;
   }    
   else if(method.value==="DELETE"){
    
    work_title.innerHTML = `<p><span style="color: red;">${method.value}</span> ${url.value}</p>`;
   }    

   
    console.log(obj)
forFetching(obj)
    })




 function forFetching(data){
// axios.post('http://localhost:8596/', data)
//  .then((data)=>{
//     console.log(data)
//   })
//   .catch(error => {
//     console.log(error);
//   });
  fetch("http://localhost:8596/",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  }
  ).then((res)=>res.json()).then((newdata)=>{
    console.log(JSON.stringify(newdata.msg, null, 2));
    response_body.innerText = JSON.stringify(newdata.msg, null, 2)
  }).catch((err)=>{
    console.log(err)
  })
}


 



 








