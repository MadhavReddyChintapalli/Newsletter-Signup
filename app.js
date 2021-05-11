const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.listen(process.env.PORT || 3000,function(){
  console.log("Server started on port 3000.")
})

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
  const firstName=req.body.firstName;
  const lastName=req.body.lastName;
  const email=req.body.email;
  const data={
    members:[
      {
        email_address: email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }

    ]
  }


const jsonData=JSON.stringify(data);
const url="https://us7.api.mailchimp.com/3.0/lists/5f41cb0d7c";
const options={
  method:"POST",
  auth:"madhav:00660b606bb3636a0735342e95d63b20-us7"
}

const request1=https.request(url,options,function(response){

  if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html");
  }
  else{
    res.sendFile(__dirname+"/failure.html");
  }
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})

request1.write(jsonData);
request1.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
})



// 00660b606bb3636a0735342e95d63b20-us7

// 5f41cb0d7c
