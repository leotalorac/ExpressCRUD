const Users = require('./../models/users')

// Use class or functions
function helloWorld(req, res) {
    try {
        res.status(200).json({
            status: 200,
            response: "OK"
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            response: error
        })
    }
}

function createUser(req,res){
    const userDB = new Users({...req.body})
    try{
        userDB.save((err,user)=>{
            if(err) throw Error(err);
            console.log("User created");
            return res.status(200).json({
                status:200,
                response:user,
                message:"User created"
            });
        })
    }catch (error){
        res.status(400).json({
            status:400,
            response:error,
            message:"Error on create user"
        });
    }
}

function getAllUsers(req,res){
    try{
        Users.find({},(err,users)=>{
            if(err) throw Error(err);
            console.log("Get all users");
            return res.status(200).json({
                status:200,
                response:users,
                message:"Get all users"
            })
        });
    }catch (error){
        res.status(400).json({
            status:400,
            response:error,
            message:"Error on get all users"
        });
    }
}
function getUserByName(req,res){
    try{
        Users.find({"name":{"$regex":`${req.body.name}`}},(err,users)=>{
            if(err) throw Error(err);
            console.log("Get users by name");
            return res.status(200).json({
                status:200,
                response:users,
                message:"Get users by name"
            })
        });
    }catch (error){
        res.status(400).json({
            status:400,
            response:error,
            message:"Error get users by name"
        });
    }
}

function updateUser(req,res){
    try{
        Users.updateOne({email:req.body.email},{...req.body},(err,user)=>{
            if(err) throw Error(err);
            console.log("User replaced");
            return res.status(200).json({
                status:200,
                response:user,
                message:"User replaced"
            })
        });
    }catch (error){
        res.status(400).json({
            status:400,
            response:error,
            message:"Error on user replace"
        });
    }
}

function deleteUser(req,res){
    try{
        Users.deleteOne({email:req.body.email},(err,user)=>{
            if(err) throw Error(err);
            console.log("User deleted");
            return res.status(200).json({
                status:200,
                response:user,
                message:"User deleted"
            })
        });
    }catch (error){
        res.status(400).json({
            status:400,
            response:error,
            message:"Error on delete user"
        });
    }
}

function login(req,res){
    try{
        Users.findOne({email:req.body.email},(err,user)=>{
            if(err || user==null) {
                if(user==null)
                    throw Error("User not found");
                else
                    throw Error(err);
            }
            console.log("Login");
            if(user.password == req.body.password){
                return res.status(200).json({
                    status:200,
                    message:"Login successful"
                })
            }else{
                return res.status(403).json({
                    status:403,
                    message:"Incorrect password"
                })
            }
        });
    }catch (error){
        res.status(400).json({
            status:400,
            response:error,
            message:"Error on login"
        });
    }
}

module.exports = { helloWorld,createUser, getAllUsers,getUserByName,updateUser,deleteUser,login}