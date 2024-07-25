const User = require("../module/UserModel");
const generateToken = require('../Config/generateToken');




const registerUser = async (req , res)=>{
    const { name, email, password } = req.body;

      try {
        const userExists = await User.findOne({ email });
      if (userExists) {
        res.status(400).send("User already exists");
      }

      const user = await User.create({
        name,
        email,
        password,
      });

      if(user){
        res.status(200).send({
          _id: user._id,
          name: user.name,
          email: user.email,
          // token: generateToken(user._id),
        })
      }
      else {
        res.status(400).send("User not found");
      } 
      } catch (error) {
        console.log(error)
      }  
}

const loginUser = async (req, res)=>{
  const { email, password } = req.body;
  console.log(req.body)
  
  try {
    const user = await User.findOne({email});
  if(user == null){
    res.status(400).send("Invalid Email")
  }
  if(password == user.password){
    res.status(200).send(
     {
      _id: user._id,
      name: user.name,
      email: user.email,
      token : generateToken(user._id)
     }
    )
  }
  else{
    res.status(401).send("Invalid Password");
  }
  } catch (error) {
    console.log(error)
  }
}

const allUsers = async (req, res)=>{
  const keyword = req.query.search ? {
    $or: [
      { name: { $regex: req.query.search, $options: "i" } },
      { email: { $regex: req.query.search, $options: "i" } },
    ],
  } : {  }
 
   const user = await User.find(keyword).find({ _id: { $ne: req.user._id } })
   res.send(user);
}



module.exports = {registerUser, loginUser, allUsers}