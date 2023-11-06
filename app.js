require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const premiumRoutes = require('./routes/premiumRoutes');
const passwordRoutes = require('./routes/passwordRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(expenseRoutes);
app.use(purchaseRoutes);
app.use(premiumRoutes);
app.use(passwordRoutes);

mongoose.connect('mongodb+srv://samiya90mohsin:pHPgT1Yt0s3J1C5X@cluster0.tnku2xi.mongodb.net/')
    .then(result => {
        app.listen(3000)
        console.log('listening to port 3000')
    })
    .catch(err => console.log(err))

