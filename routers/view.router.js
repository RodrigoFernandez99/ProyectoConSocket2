import express from 'express';
import ProductManager from '../managers/ProductManager';
import { Server } from 'socket.io';


const socketServer = new Server(httpServer);
const io = socketServer()

const router = express();

router.get('/',async (req, res) => {
    const products = await ProductManager.getProducts();

    res.render('home',{
        title:"Lista de productos",
        products
    });
})


router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getAll();
    res.render('realTimeProducts', { products })
  });


const socket = io();

const productForm = document.querySelector('#product-form');
productForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
  const price = document.querySelector('#price').value;
  const category = document.querySelector('#category').value;
  const stock = document.querySelector('#stock').value;
  const code = document.querySelector('#code').value;
  socket.emit('createProduct', { title, description, price, category, stock, code });
});

const deleteProductForm = document.querySelector('#delete-product-form');
deleteProductForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const productId = document.querySelector('#product-id').value;
  socket.emit('deleteProduct', productId);
});

export default router;