const fs = require ('fs');
const path = require ('path');
const filePath = path.join(__dirname, '../views/productsDataBase.json')
const listaProductosJSON = fs.readFileSync(filePath);

//VARIABLES DECLARADAS GLOBALMENTE

let listaProductosJS = JSON.parse (listaProductosJSON);
let visitedProducts = listaProductosJS.filter(producto => producto.category == 'visited');
let insaleProducts = listaProductosJS.filter(producto => producto.category == 'in-sale');

//CONTROLADOR Y CADA METODO
const productController = {
    index: (req,res)=> {
        res.render('index', { 
            visitedProducts , insaleProducts
        })
    },
    product: (req,res)=> {
        let producto = listaProductosJS.find(producto => producto.id == req.params.id)
        let descuentoProducto = producto.price - (producto.price * producto.discount / 100) ;
        res.render('product', {
             producto , descuentoProducto 
            });
    },
    products: (req,res)=> {
        res.render('products', {listaProductosJS});
    },
    edit: (req, res)=> {
        let productToEdit = listaProductosJS.find(producto => producto.id == req.params.id)
        res.render('edit-form', {productToEdit})
    },
    update: (req,res)=>{
        let editId = req.params.id
        product.forEach(product => {
        if (product.id == editId) {
            product.name = req.body.name
            product.description = req.body.description
            product.price = req.body.price
            product.discount = req.body.discount
            product.image = "default-image.png"
            product.category = req.body.category           
        }})
       let productsJson = JSON.stringify(products)
        fs.writeFileSync(filePath, productsJson)
        res.redirect('/')
    },
    destroy: (req,res) =>{
        let deleteId = req.params.id
        let newDataBase = listaProductosJS.filter(product => product.id != deleteId)
        let newDataBaseJS = JSON.stringify(newDataBase, null, " ");
        fs.writeFileSync(filePath, newDataBaseJS);
        res.redirect('/')
    },
    create: (req,res) =>{
        res.render('create-form');
    },
    store: (req,res) =>{
        let createID = listaProductosJS[listaProductosJS.length-1].id + 1 
        let newProduct = {
            id: createID,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount,
            image: "default-image.png",
            category: req.body.category,
        }
        listaProductosJS.push(newProduct);
        let newProductList = JSON.stringify(listaProductosJS, null, " ");
        fs.writeFileSync(filePath, newProductList)
        res.redirect('/')
    }
}

module.exports = productController;
