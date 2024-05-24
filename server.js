const express = require('express');
const mongoose = require('mongoose')
const Product = require("./models/productModel")
const app = express()

app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Admin Username & Password
const user = {
    username: "admin",
    password: "admin",
}

//main Store View Page
app.get('/',(req,res)=>{
    res.render("main.ejs")
})

//employee login page
app.get('/employee_Login_Page',(req,res)=>{
    res.render("employee_Login_Page.ejs")
})


app.post('/employeelogin', (req, res) => {
    // Check if username and password match
    if (req.body.username === user.username && req.body.password === user.password) {
      // Redirect to a protected page if credentials match
      res.redirect('/protectedpage');
    } else {
      // Render error page if credentials don't match
      res.render('error.ejs', { message: "Invalid username or password" });
    }
});


app.get('/product', async(req,res)=>{
    try{
        const products = await Product.find({})
        res.status(200).json(products)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

app.get('/product/:id', async(req,res)=>{
    try{
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

app.post('/product', async(req,res)=>{
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put('/product/:id', async(req,res)=>{
    try{
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)

        if(!product){
            return res.status(404).json({message: `cannot find any product with ID : ${id}`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    }catch(error){
        res.status(500).json({message : error.message})
    }
})

app.delete('/product/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message: `cannot find item id ${id}`})
        }
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message : error.message})
    }
})

app.use(express.static("public"))

mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://liekenny273:YxFdmaRjYtT14H4c@menudb.gori076.mongodb.net/LINE_APP@?retryWrites=true&w=majority&appName=MenuDB')
.then(()=>{
    app.listen(3000,()=>{
        console.log(`server is running at http://localhost:3000/`)
    })
    console.log('connected to MongoDB')
}).catch((error)=>{
    console.log('error')
})