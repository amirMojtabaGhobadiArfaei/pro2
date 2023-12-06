const express = require("express");
const server = express();
const {request, response} = require("http")
const cors = require("cors")
const mongoose = require("mongoose")
const Product = require("./models/product")
const port = 3000;
const db_uri = "mongodb+srv://admin:mojtabA._.1383@cluster0.zupcphm.mongodb.net/products?retryWrites=true&w=majority"
////////Middlewaere
server.use(express.urlencoded({extended:false}))
server.use(express.json())
server.use(cors())


////////Connections
mongoose.connect(db_uri).then((result) =>{
    server.listen(port, () => {
        console.log(`Listening on ${port}...\nConnect to DB`);
    })
})
.catch((error) => {
    console.log(error);
});

server.get("/products", async (request, response) => {
    const products = await Product.find()
    response.send(products);
});
 
    
server.post("/addProduct", async  (request, response) => {
    const product = request.body
    const postProduct = new product({
        id: product.id,
        productName: product.productName,
        brand: product.brand,
        quantity: product.quantity,
        image: product.image,
        price: product.price,
    });
    const saveProduct = await postProduct.save();
    saveProduct 
    ? response.send("product is added to inventory")
    : response.send("Failed to add");
})
