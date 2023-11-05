const Expense = require('../models/expenses');
const User = require('../models/user')
const sequelize = require('../util/database')

const path = require('path');

exports.postExpense = async (req,res,next)=>{
    
    try{
    console.log('in post expense controller')
    const userId = req.user.id ; 
    const {amount,description,category} = req.body;
    const data = new Expense({amount, description, category, userId})
    await data.save()
    const totalExpense = Number(req.user.totalexpenses) + Number(amount) ;
    await User.updateOne({ _id: userId }, { totalexpenses: totalExpense } )
            
            console.log('commit')
            //console.log('in then',expense)
            res.status(200).json(data)       
    }
    
    catch(err){
        console.log(err);
      
        console.log('rollback')
        return res.status(500).json({success:false , error : err});
    };
}

exports.getExpense = async (req, res, next) => {
    try{
    const limit = parseInt(req.query.limit) || 10;
    const currentPage = parseInt(req.query.page) || 1;
    const offset = (currentPage - 1) * limit;
    const userId = req.user.id;
    
    const count = await Expense.countDocuments({ userId });

    const totalPages = Math.ceil(count / limit);

    const expenses = await Expense.find({ userId })
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit);

        res.json({
            expenses,
            totalPages,
        });
    }
    catch(err){
        console.log(err)
    } 
}



exports.deleteExpense = async (req, res, next) => {
   
    try{
        const id = req.params.id        
        console.log('expense id params',id)
        const expense = await Expense.findOne({_id:id, userId:req.user.id})           
        
        const totalExpense = Number(req.user.totalexpenses) - Number(expense.amount) ;
        await User.updateOne({ id : req.user.id},{totalexpenses : totalExpense })
           await expense.deleteOne()
          
           console.log('commit')
           //console.log('in then',expense)
           res.status(200).json(expense)   

        //.then(result=>res.json('delete'))
       
        console.log('entry deleted')
    }
    catch(e){
       
        console.log('rollback del')
        console.log(e)
    }  
}

exports.app = (req,res,next)=>{
    res.sendFile(path.join(__dirname,  '../FrontEnd/addExpense.html'));
}