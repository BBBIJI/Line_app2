const express = require('express');
const mongoose = require('mongoose')
const Product = require("./models/productModel")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get('/', function (req,res){
    res.send('helloWorld')
})

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