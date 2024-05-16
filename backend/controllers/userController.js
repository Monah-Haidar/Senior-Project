import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

// authentication token manager
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
};


const createUser = async(req,res) =>{
    try{
    await User.sync();
    const {username, email, password, first_name, last_name} = req.body
    const existingUser = await User.findOne({where:{email}})
    if(existingUser !== null){
        res.status(400).json({message:"User already exists"})
    }
    else{
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashPassword, first_name, last_name });
    const token = generateToken({ user_id: user.user_id });
    res.send(token);
    }
    
    }catch(err){
        res.status(500).json({"message":err.message})
    }
    
}

const loginUser = async(req,res) =>{
     try {
    const { email, password } = req.body;
    const user = await User.findOne({where:{email} });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = generateToken({ userId: user._id });

    // Send response to the client
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


const getUser = async (req,res)=>{
    try{
 const id = req.params.id
    const user = await User.findByPk(id)
    if (!user){
        res.status(404).json({"message":"User not found"})
    }else{
    res.json(user);
    }
    }catch(err){
        res.status(500).json({"message":err.message})
    }
}

const updateUser = async (req,res)=>{
    const { password, first_name, last_name} = req.body
    const id = req.params.id
    const user = await User.findByPk(id)
    if (!user){
        res.status(404).json({"message":"User not found"})
    }else{
        // TODO: validate password before passing to hash
        const hashPassword = await bcrypt.hash(password, 10);
        user.update({ first_name, last_name, hashPassword });
        res.json(user);
    }

}

const deleteUser = async (req,res)=>{
    const id = req.params.id 
    const user = await User.findByPk(id)
    if (!user){
        res.status(404).json({"message":"User not found"})
    }
    await user.destroy()
    res.status(200).json({"message":"User deleted"})
}

const getAllUsers = async (req,res) =>{
    try{
        const users = await User.findAll()
        res.json(users)
    }catch(err){
        res.status(500).json({"message":err.message})
    }
}


export {
    createUser,
    updateUser,
    deleteUser,
    getUser,
    getAllUsers,
    loginUser
};