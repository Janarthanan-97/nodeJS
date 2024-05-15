const User = require("../module/UserModel");
const generateToken = require('../Config/generateToken');




const registerUser = async (req , res)=>{
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("User already exists");
      }

      const userExists = await User.findOne({ email });
      if (userExists) {
        res.status(400);
        throw new Error("User already exists");
      }

      const user = await User.create({
        name,
        email,
        password,
        pic,
      });

      if(user){
        res.status(200).send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          pic: user.pic,
          token: generateToken(user._id),
        })
      }
      else {
        res.status(400);
        throw new Error("User not found");
      }   
}

const authUser = async (req, res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({email});
  if(!user){
    res.status(401);
    throw new Error("Invalid Email");
  }
  if(password == user.password){
    res.status(200).send(
     {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token : generateToken(user._id)
     }
    )
  }
  else{
    res.status(401);
    throw new Error("Invalid Password");
  }

}

const allUsers = async (req, res)=>{
  const keyword = req.body.keyword
  let search = {}

    if(keyword.indexOf('@') != -1){
      search ={email: keyword}
    }
    else{
      search = {name: keyword}
    }
   const user = await User.find(search).find({ _id: { $ne: req.user._id } })
   res.send(user);



}

module.exports = {registerUser, authUser, allUsers}