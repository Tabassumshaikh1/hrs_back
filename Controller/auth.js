const schema = require("../Model/Register");
const jwt = require('jsonwebtoken');
async function regis(req, res) {
 //check if user already exists or not
  const check_email=await schema.find({email:req.body.email})
  if(check_email.length!=0){
    res.send({msg:"User Already exists",status:1})
  }
  else{
    const data = await schema({...req.body})
    data.save()
  
   
    res.send({msg:"Registered successfully",status:0})

  }
 
}
async function login(req,res){
console.log(req.body)
//check if user registered or not
const data = await schema.findOne({email:req.body.email})
if(data){
  let jwtSecretKey = process.env.secret; 
  let tokenTime = { 
    time: Date(), 
    userData:data , 
  } 
  console.log("GW",tokenTime)

  const token = jwt.sign(tokenTime, jwtSecretKey);
  console.log("Token",token)
  res.send({msg:"Login successfull",token:token,status:0})
}
else{
  res.send({msg:"You are not registerd. Please register first ",status:1})
}
}
// async function Getvideo(req, res) {
//   try {
//     const data = await schema.find();
//     res.send(data);
//   } catch {
//     res.send({ message: "Something went wrong" });
//   }
// }
// async function GetvideoById(req, res) {
//   try {
//     const data = await schema.findById({ _id: req.body.id });
//     res.send(data);
//   } catch {
//     res.send({ message: "Something went wrong" });
//   }
// }
// async function DeleteVideoById(req, res) {
//   try {
//     await schema.findOneAndDelete({ _id: req.body.id });
//     res.send({ message: "Video deleted successfully" });
//   } catch {
//     res.send({ message: "Something went wrong" });
//   }
// }
module.exports = {
  regis,
  login
  // Getvideo,
  // GetvideoById,
  // DeleteVideoById,  
};
