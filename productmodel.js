const mongoose = require('mongoose');
const schema= mongoose.Schema;

//creating new schema
const productschema= new schema({
    product_name:{type:String, required:true},
    color:{type:[String], required:true},
    price   :{type:Object, required:true},
    description:String,
    category:[String],
    material:{type:[String],required:true},
    time_required:Number
})

var productmodel=mongoose.model('productmodel',productschema);
module.exports=productmodel;