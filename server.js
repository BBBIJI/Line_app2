const express = require('express');
const app = express()

app.get('/', function (req,res){
    res.send('helloWorld')
})

app.listen(3000,()=>{
    console.log(`server is running at port 3000`)
})