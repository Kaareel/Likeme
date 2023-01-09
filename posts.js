const {Pool} = require("pg");
require("dotenv").config({path:"./.env"});

const credenciales = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    allowExitOnIdle: true,
  };

  const pool = new Pool(credenciales)

  const addPost = async(titulo, img, description,likes) => {
    const consulta = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4)";
    const values = [titulo, img, description,likes]
    const result = await pool.query(consulta, values)
  }


  const getPost = async() => {
    const {rows} = await pool.query("SELECT * FROM posts")
    return rows
  }

  const putPost = async (id) => {
    const consulta = "UPDATE posts SET likes = likes+1 WHERE id = $1";
    const values = [id]
    const result = await pool.query(consulta, values)
    }

    const deletePosts = async (id) => {
      const consulta = "DELETE FROM posts WHERE id = $1"
      const values = [id]
      const result = await pool.query(consulta, values)
}
    
  module.exports = {addPost, getPost, putPost, deletePosts}