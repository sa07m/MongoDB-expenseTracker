const razorpay =require('razorpay');
const Order = require('../models/orders');
const User = require('../models/user');
const jwt = require('jsonwebtoken')

exports.purchasepremium = async (req,res,next)=>{
    try{
        // console.log('key id : -- ',process.env.RAZORPAY_KEY_ID)
        var rzp = new razorpay({
            key_id: process.env.RAZORPAY_KEY_ID ,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const amount = 1000;

        const order = await rzp.orders.create({amount , currency: "INR"})
        const newOrder = new Order({orderid: order.id , status : 'PENDING'})
        await newOrder.save()
        return res.status(201).json({order , key_id: rzp.key_id});
            
    }catch(err){
        console.log(err);
        res.status(403).json({message: ' something went wrong ' , error : err})

    }
}

// exports.updateTransaction = async (req,res,next)=>{
//     try{
//         const { payment_id , order_id} =req.body ;
//         const id = req.user.id ;
//         const order =await Order.findOne({ orderid : order_id })
//         const promise1 = order.update({paymentid : payment_id , status : 'SUCCESSFUL' });
//         const promise2 = req.user.update({ispremiumuser : true});
//         const token =  await jwt.sign({ id: id , ispremiumuser : true }, process.env.TOKEN_SECRET);        
//         Promise.all([promise1 , promise2]).then(()=>{
//             return res.status(202).json({success : true , message : 'Transaction Successful' , token : token });
//         }).catch(err=>{
//             throw new Error(err);
//         })
//     }catch(err){
//         console.log(err);
//         res.status(403).json({message: ' updating transaction something went wrong ' , error : err})
//     }
// }

// exports.updateTransactionFail = async (req,res,next)=>{
//     try{
//         const {  order_id} =req.body ;
//         const order = await Order.findOne({where : { orderid : order_id }})
//         await order.update({ status : 'FAILED' })
//         return res.status(400).json({success : false , message : 'Transaction Failed'});
//     }catch(err){
//         console.log(err);
//         res.status(403).json({message: ' updating transaction something went wrong ' , error : err})
//     }
// }

function generateToken(id, ispremiumuser){
    return jwt.sign({id, ispremiumuser}, process.env.TOKEN_SECRET)
}

exports.updatetransactionstatus = async (req, res, next) => {
try {
    // storing the id from user table
    const userId = req.user._id;
    // taking the details of payment id and order id
    const { payment_id, order_id } = req.body;
    // finding the order using order id 
    const order = await Order.findOne({ orderId: order_id });

    if (!payment_id) {
      const promise1 = Order.updateOne({ status: 'FAILED' });
      const promise2 = User.updateOne({ _id: userId }, { ispremiumuser: false });
      Promise.all([promise1, promise2]).then(() => {
        const token = generateToken(userId, false);
        return res.status(407).json({ success: false, message: 'Transaction Failed', token });
      }).catch((error) => {
        throw new Error(error);
      });
    } else {
      // updating the payment id and status only after the payment is successful 
      const promise3 = Order.updateOne({ paymentid: payment_id, status: 'SUCCESSFUL' });
      // Upon successful payment and status is updated, updating the user table as the user is premium or not 
      const promise4 = User.updateOne({ _id: userId }, { ispremiumuser: true });
      // Now setting the promise and sending the status on which user above promises will be applied.
      Promise.all([promise3, promise4]).then(() => {
        const token = generateToken(userId, true);
        return res.status(202).json({ success: true, message: 'Transaction Successful', token });
      }).catch((error) => {
        throw new Error(error);
      });
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: err, message: 'Something went wrong' });
  }
};