const express = require('express')
const app = express()

const cors = require('cors')
const {addPost, getPost} = require('./posts.js');
require("dotenv").config({path:"./.env"});


app.use(express.json())
app.use(cors())
app.use(express.static('public'));
app.listen(3000, console.log("¡Servidor encendido!"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "./public/index.html")
});

app.get('/post', async(req, res) => {
    try{
        const post = await getPost()
        let fixPost = post.map((posts) => ({
            id: posts.id,
            titulo: posts.titulo,
            img: posts.img,
            descripcion: posts.descripcion}))
        res.json(fixPost)
    }
    catch(error){ 
        res.json({message: 'post no encontrado'})
    }
});

app.post('/post', async(req, res) =>{
    try{
        const {titulo, img, descripcion, likes} = req.body
        console.log(req.body)
        await addPost(titulo, img, descripcion, likes)
        res.send('se agrego correctamente el post')
    }
    catch(error){
        res.json({message: 'post no encontrado'})
    }
});