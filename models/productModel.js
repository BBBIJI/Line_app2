const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name : {
            type:String,
            required : [true, "Please Enter the Product Name"]
        },
        quantity : {
            type : Number,
            required : false,
        },
        price:{
            type: Number,
            required : true
        },
        image:{
            type : String,
            required : false
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;