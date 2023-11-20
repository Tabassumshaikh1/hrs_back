const schema = require("../Model/Register");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const saltRounds = 10;
async function regis(req, res) {
  //check if user already exists or not
  const check_email = await schema.find({ email: req.body.email })
  //check phone number
  const check_phone = await schema.find({ contactno: req.body.contactno })
  const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
  if (check_email.length != 0) {
    res.send({ msg: "Email Already exists Try Another one", status: 1 })
  }
  else if (check_phone.length != 0) {
    res.send({ msg: "Number Already exists Try Another one", status: 1 })
  }
  else {
    const reqData = req.body
    reqData.password = hashPassword
    const data = await schema({ ...reqData })
    data.save();
    res.send({ msg: "Registered successfully", status: 0 })
  }
}
async function login(req, res) {
  //check if user registered or not
  const data = await schema.findOne({ email: req.body.email })

  if (data) {
    //check if password is valid or not
    const hashpassword = data.password;
    const passwordCompare = await bcrypt.compare(req.body.password, hashpassword)
    if (!passwordCompare) {
      res.send({ msg: "Wrong Password", status: 1 })
      return
    }
    let jwtSecretKey = process.env.secret;
    let tokenTime = {
      time: Date(),
      userData: data,
    }
    const token = jwt.sign(tokenTime, jwtSecretKey);
    res.send({ msg: "Login successfull", token: token, status: 0 })
  }
  else {
    res.send({ msg: "You are not registerd. Please register first ", status: 1 })
  }
}
module.exports = {
  regis,
  login
};
