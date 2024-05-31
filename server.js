const express = require('express');
const mongoose = require('mongoose')
const VegFood = require("./models/VegFoodModel")
const Employee = require("./models/employeeModel")
const MainBuffetFood = require("./models/MainBuffetFoodModel");
const BreakfastFood = require("./models/BreakfastFoodModel")
const app = express()

app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended: false}))


//main Store View Page
app.get('/',(req,res)=>{
	res.render("main.ejs")
})

//employee login page
app.get('/employee_Login_Page',(req,res)=>{
	res.render("employee_Login_Page.ejs")
})

app.post('/employee_Login_Page',async(req, res)=>{
	try{
		const employee = await Employee.findOne({username: req.body.username, password: req.body.password})
		if(!employee){
			return res.status(404).json({message: `cannot find user`})
		}
		res.redirect('/EmployeeMain')
	}catch(error){
		res.status(500).json({message : error.message})
	}
}
);

//vegetarian store view
app.get('/Vegetarian',async(req,res)=>{
	try{
		const VegFoods= await VegFood.find({})
		res.render("Vegetarian.ejs", {vegFoods : VegFoods})
	}catch(error){
		res.status(500).json({message: error.message})
	}
})

app.get('/MainBuffet',async(req,res)=>{
	try{
		const MainBuffetFoods = await MainBuffetFood.find({})
		res.render("MainBuffet.ejs", {mainBuffetFoods : MainBuffetFoods})
	}catch(error){
		res.status(500).json({message: error.message})
	}
})

//employee mainbuffet edit store view
app.get('/MainBuffet_Edit',(req,res)=>{
	res.render("MainBuffet_Edit.ejs")
})

app.post('/MainBuffet_Edit', async(req,res)=>{
	try{
		const food = await MainBuffetFood.create(req.body)
	}catch(error){
		console.log(error.message);
		res.status(500).json({message: error.message})
	}
})

//breakfast store view
app.get('/Breakfast',async(req,res)=>{
	try{
		const BreakfastFoods = await BreakfastFood.find({})
		res.render("Breakfast.ejs", {breakfastFoods : BreakfastFoods})
	}catch(error){
		res.status(500).json({message: error.message})
	}
})

//Breakfast store employeee edit view
app.get('/Breakfast_Edit',(req,res)=>{
	res.render("Breakfast_Edit.ejs")
})

app.post('/Breakfast_Edit', async(req,res)=>{
	try{
		const food = await BreakfastFood.create(req.body)
	}catch(error){
		console.log(error.message);
		res.status(500).json({message: error.message})
	}
})
	
//vegetarian food employee edit view
app.get('/Veg_Edit',(req,res)=>{
res.render("Veg_Edit.ejs")
})

app.post('/Veg_Edit', async(req,res)=>{
	try{
		const food = await VegFood.create(req.body)
	}catch(error){
		console.log(error.message);
		res.status(500).json({message: error.message})
	}
})

//employee main store view
app.get('/EmployeeMain', (req,res)=>{
	res.render("EmployeeMain.ejs")
})


//database conncectivity
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