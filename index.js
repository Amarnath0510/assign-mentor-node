
import express, { request, response } from "express";
import {MongoClient}  from "mongodb";
import dotenv from "dotenv";
dotenv.config();


const app=express();
 app.use(express.json());

const PORT=9000;


const MONGO_URL=process.env.MONGO_URL;


async function createConnection(){
    const client=new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo Successfully connected");
    return client;
}

const client = await createConnection();

app.get("/mentors",async(request,response)=>{
  const filteredMentors=await client
  .db("mentor")
  .collection("mentors")
  .find({})
  .toArray();
 
  console.log(filteredMentors);
  response.send(filteredMentors);
  });

app.post("/mentors",async(request,response)=>{
  const data=request.body;
  const result=await client.db("mentor").collection("mentors").insertMany(data);
  response.send(result);

})

app.put("/mentors/:id",async(request,response)=>{
  console.log(request.params);
  const{_id}=request.params;
  const data=request.body;
  const result =await client
  .db("mentor")
  .collection("mentors")
  .updateOne({id:_id},{$set:data});
  response.send(result);

})









app.get("/",(request,response)=>{
    response.send("Welcome🙏🙏🙏 to Mentor assign Portal🏢🏢🏢 ");
})







app.listen(PORT,()=>console.log("App is started in",PORT));