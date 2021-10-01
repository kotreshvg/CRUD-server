//Importing express module
const express = require('express');
const app = express();
var cors = require('cors');

//defining mongo uri
const db=process.env.mongoURI;

//connecting to mongo db
const mongoose=require('mongoose');
mongoose.connect(db,
    { useNewUrlParser: true,
        useUnifiedTopology: true }
    )
.then(()=>{console.log('database connected...')})
.catch(err=>{console.log('connection failed...'); console.log(err)});

//server starting
app.listen(3000, ()=>{
    console.log('server running')
});

//handling get request
app.get('/',(req,res)=>{
    res.send('hello this is express at your service !!')
})

//accessing product model from db
const productmodel=require('./productmodel');

//express parser to destructure incoming request
app.use(cors());
app.use(express.json({}));
app.use(express.urlencoded({extended : true}));

//handling get response for a product
app.get('/:productid',(req, res)=>{
    productmodel.findById(req.params.productid)
    .then(product=>res.json(product))
    .catch(err=>console.error(err));
});

//handling post response to create new product
app.post('/',(req,res)=>{
    var product=new productmodel({
        product_name:req.body.product_name,
        color       :req.body.color,
        price       :req.body.price,
        description :req.body.description,
        category    :req.body.category,
        material    :req.body.material,
        time_required:req.body.time
    });
    product.save()
    .then(
        product=>{
            id=product.id;
            res.send(`product created succesfully...${id}`).end()}
    );
});

//handling update request 
app.put('/update',(req,res)=>{
    filter={'_id': req.body._id};
    update={$set:{
        product_name:req.body.product_name,
        color       :req.body.color,
        price       :req.body.price,
        description :req.body.description,
        category    :req.body.category,
        material    :req.body.material,
        time_required:req.body.time
    }};
    productmodel.updateOne(filter,update, {useFindAndModify: false, new:true},
    (err,product)=> err? console.error(err): res.json(product))
    .then(console.log(req.body._id+' succesfully updated'))
})

//handling delete request
app.delete('/:productid',(req,res)=>{
    productmodel.deleteOne({
        '_id':req.params.productid
    }).then(console.log('product deleted bearing id'+req.params.productid))
    res.send('product removed').end();
})