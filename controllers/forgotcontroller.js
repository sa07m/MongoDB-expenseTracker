const { v4: uuidv4 } = require('uuid');
const ForGotPassword =require('../models/forgotpassword');
const User = require('../models/user'); 
const bcrypt =  require('bcrypt');

const Sib = require('sib-api-v3-sdk')
require('dotenv').config()
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY
const tranEmailApi = new Sib.TransactionalEmailsApi()
const sender = {
    email : 'mohsam064@gmail.com' ,
    name : 'expense-tracker'
}

const path = require('path');


exports.forgot = (req,res,next)=>{
    res.sendFile(path.join(__dirname,  '../FrontEnd/forgotpassword.html'));
}

exports.forgotpassword = async (req,res,next)=>{
    try{
        const email =  req.body.email;
        const user = await User.findOne({email});
        if(user){
            const uuid = uuidv4();
            const forgotpasswordrequest = await new ForGotPassword({ uuid : uuid , userId : user.id , isActive:true})
            forgotpasswordrequest.save();
            const recievers = [{email}]
            await tranEmailApi.sendTransacEmail({sender , to : recievers , subject : 'link to reset password' , 
                                            textContent : `http://localhost:3000/password/resetpassword/{{params.uuid}}` ,
                                            params :{uuid : uuid} })
            const link = `http://localhost:3000/password/resetpassword/${uuid}` ;
            res.status(200).json({msg : 'email sent to reset password' , link : link  });

        }else{
            res.status(400).json({msg : 'enter valid email id'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : err});
    }


}

exports.resetpassword = async(req,res,next)=>{
    try{
    const uuid = req.params.uuid ;
    console.log('uuid hai', uuid)
    const  forgotpassword = await ForGotPassword.findOne({ uuid : uuid , isActive : true});
    console.log('fogot psswd hsi', forgotpassword)
    if(forgotpassword){
        const updatedforgotpassword = await forgotpassword.updateOne({isActive:false})
        console.log('fogot psswd jo  hsi', forgotpassword)
        res.sendFile(path.join(__dirname,  '../FrontEnd/resetpassword.html'));
    }else{
        res.status(400).json({message : 'invalid request'})
    }
    }catch(err){
    console.log(err);
    res.status(500).json({error : err});
    }
}

exports.updatepassword = async(req,res,next)=>{
    try{
        const {email , password } = req.body ;
        const user = await User.findOne({email});
        if(user){
            bcrypt.hash(password , 10 , async ( err , hash)=>{
                await user.updateOne({password: hash});
                console.log('sending update')
                res.status(201).json({message : 'password changed  successfully'})
            })
        }else{
            res.status(400).json({message : 'no such user exists'})
        }
    }catch(err){
    console.log(err);
    res.status(500).json({error : err});
    }
}

exports.loginpage = (req,res)=>{
    res.sendFile(path.join(__dirname,  '../FrontEnd/resetpassword.html'))
}