const User = require('../models/userModel')
const Expense = require('../models/expenseModel')

const AWS = require('aws-sdk');
const UserServices = require('../services/userservices')
const S3services = require('../services/s3services')


exports.showleaderboard = async (req, res, next) => {
    try {
        const expenses = await User.find({})
            .select('name totalexpenses')
            .sort({ totalexpenses: -1 });

        res.status(200).json(expenses);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

exports.download = async (req, res, next) => {
    try {
        const userid = req.user.id;

        // Use Mongoose to get the expenses for the user
        const expenses = await Expense.find({ userId: userid });

        const stringifiedExpenses = JSON.stringify(expenses);

        // Create a unique filename for the text file based on the user's ID and the current date.
        const filename = `Expenses${userid}/${new Date()}.txt`;

        // Upload the stringified expenses to an S3 storage service and get the file URL.
        const fileUrl = await S3services.uploadtoS3(stringifiedExpenses, filename);

        res.status(200).json({ fileUrl, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ fileUrl: '', success: false, err: err });
    }
};
