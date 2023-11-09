const schema = require("../Model/Register");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const saltRounds = 10;
async function regis(req, res) {
 //check if user already exists or not
  const check_email=await schema.find({email:req.body.email})
  //check phone number
  const check_phone = await schema.find({contactno:req.body.contactno})
  const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
  console.log("Hash Password",hashPassword)
  if(check_email.length!=0){
    res.send({msg:"Email Already exists Try Another one",status:1})
  }
  else if(check_phone.length!=0){
    res.send({msg:"Number Already exists Try Another one",status:1})
  }
  else{
    const reqData = req.body
    reqData.password=hashPassword
    const data = await schema({...reqData})
    data.save();   
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
