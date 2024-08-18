const express = require('express');
const app = express();
const Razorpay= require('razorpay');
const cors = require('cors');


require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

const razorpay= new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

app.get("/",(req, res)=>{
    res.sendFile("index.html",{root: __dirname});
})

app.post("/create-order",async(req, res)=>{
    try{
        const {amount , currency , receipt, quantity}= req.body ;
        var options = {
            amount: amount * quantity * 100 ,
            currency,
            receipt,
           
        }
       const order= await razorpay.orders.create(options); 
       res.json(order);

      
        

    }catch(error){
        console.log(error);
        res.status(500).send(error);

    }

})

app.post('/verify-payment',  (req, res) => {
    const { order_id, payment_id, signature } = req.body;
  
    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(order_id + "|" + payment_id)
      .digest('hex');
  
    if (generated_signature === signature) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  });



app.listen(process.env.PORT,()=>{
    console.log("Server is running in Port ");
})