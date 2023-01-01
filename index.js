const express = require('express')
const app = express()

const cors = require('cors')
const { addPost, getPost } = require('./posts.js');
require("dotenv").config({ path: "./.env" });


app.use(express.json())
app.use(cors())
app.use(express.static('public'));
app.listen(3000, console.log("¡Servidor encendido!"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "./public/index.html")
});

app.get('/posts', async (req, res) => {
    try {
        const posts = await getPost()
        console.log(posts)
        const fixPost = posts.map((p) => ({
            id: p.id,
            titulo: p.titulo,
            img: p.img,
            description: p.description
        }))
        res.json(fixPost)
    }
    catch (error) {
        console.log(error)
        res.json({ message: 'post no encontrado' })
    }
});

app.post('/posts', async (req, res) => {
    try {
        const { titulo, img, description, likes } = req.body
        console.log(req.body)
        await addPost(titulo, img, description, likes)
        res.send('se agrego correctamente el post')
    }
    catch (error) {
        res.json({ message: 'post no encontrado' })
    }
});