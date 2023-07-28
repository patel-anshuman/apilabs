const body_type  = document.getElementById("body-data-type")
const payload = document.getElementById("body-input-area")
const send_btn = document.getElementById("send-btn") 
const method = document.getElementById("method")
const url = document.getElementById("url")
const work_title = document.querySelector("#work-title")
const response_body = document.getElementById("response-body")
const key1=document.getElementById("tab2key1")
const val1=document.getElementById("tab2val1")
const key2=document.getElementById("tab2key2")
const val2=document.getElementById("tab2val2")
const key3=document.getElementById("tab2key3")
const val3=document.getElementById("tab2val3")

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
      url:url.value
      }
   }

   if(method.value==="GET"){
    
    work_title.innerHTML = `<p><span style="color: green;">${method.value}</span> ${url.value}</p>`;
   }else if(method.value==="POST"){
    // response_body.innerText = "Data has been added"
    work_title.innerHTML = `<p><span style="color: orange;">${method.value}</span> ${url.value}</p>`;
   }    
   else if(method.value==="PUT"){
    // response_body.innerText = "Data has been updated"
    work_title.innerHTML = `<p><span style="color: blue;">${method.value}</span> ${url.value}</p>`;
   }    
   else if(method.value==="PATCH"){
    // response_body.innerText = "Data has been updated"
    work_title.innerHTML = `<p><span style="color: darkblue;">${method.value}</span> ${url.value}</p>`;
   }    
   else if(method.value==="DELETE"){
    // response_body.innerText = "Data has been deleted"
    work_title.innerHTML = `<p><span style="color: red;">${method.value}</span> ${url.value}</p>`;
   }    

   
    console.log(obj)
forFetching(obj)
forloadinghistory()
    })




 function forFetching(data){
  fetch(`${baseurl}/api/test`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  }
  ).then((res)=>res.json()).then((newdata)=>{
    console.log("Fetch Response",newdata.data)
    console.log(JSON.stringify(newdata.data, null, 2));
    response_body.innerHTML = `<textarea id="response-area"></textarea>`;
    document.getElementById("response-area").value = JSON.stringify(newdata.data, null, 2);
   
    forloadinghistory();
  }).catch((err)=>{
    console.log(err)
  })
}

function forloadinghistory(){
  fetch(`${baseurl}/api/getallAPisdata`)
          .then(response => 
            // Handle the response from the server
           response.json()
            
          ).then((data)=>{
            console.log(data.data)
            renderHistoryData(data.data)
          })
          .catch(error => {
            // Handle any errors that occur during the request
            console.error('Error:', error);
          });
}
 

forloadinghistory()

let historyArea = document.getElementById("area-3");

function renderHistoryData(data){
  // console.log("Render",data);
  console.log(data)
  historyArea.innerHTML="";
  for(let i=data.length-1; i>=0 ; i--){
    let color;
    if(data[i].method=="GET") {
      color = "green";
    } else if(data[i].method=="POST") {
      color = "orange";
    } else if(data[i].method=="PUT") {
      color = "navy";
    } else if(data[i].method=="PATCH") {
      color = "navy";
    } else {
      color = "red";
    }
    historyArea.innerHTML+=`<p><span style="color: ${color}"><b>${data[i].method}</b></span> ${data[i].requestApi}</p>`;
  }


}



document.getElementById("sign-out").addEventListener('click', ()=> {
  fetch(`${baseurl}/user/logout`)
          .then(response => {
            // Handle the response from the server
            // console.log('Response:', response);
            location.href="./index.html";
          })
          .catch(error => {
            // Handle any errors that occur during the request
            console.error('Error:', error);
          });
})
