const express = require('express')
const app = express()

const cors = require('cors')
const { addPost, getPost, putPost, deletePosts } = require('./posts.js');
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
        const fixPost = posts.map((p) => ({
            id: p.id,
            titulo: p.titulo,
            img: p.img,
            descripcion: p.description,
            likes: p.likes === 0 ? undefined : p.likes
        }))
        res.json(fixPost)
    }
    catch (error) {
        res.json({ message: 'post no encontrado' })
    }
});

app.post('/posts', async (req, res) => {
    try {
        const { titulo, url, descripcion } = req.body
        await addPost(titulo, url, descripcion, 0)
        res.send('se agrego correctamente el post')
    }
    catch (error) {
        res.status(500).json({ message: 'post no encontrado' })
    }
});

app.put("/posts/like/:id", async (req, res) => {
    const { id } = req.params
    try {
        await putPost(id)
        res.send("like agregado")
    }
    catch (error) {
        res.status(500).json({ message: 'like no disponible' })
    }
});

app.delete("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params
        await deletePosts(id)
        res.send("post eliminado con éxito")
    }
    catch(error){
        res.status(500).json({message: 'error al eliminar'})
    }
        });