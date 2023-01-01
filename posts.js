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

  const addPost = async(titulo, img, description) => {
    const consulta = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3)RETURNING *";
    const values = [titulo, img, description]
    const result = await pool.query(consulta, values)
    console.log("post agregado")
  }


  const getPost = async() => {
    const {rows} = await pool.query("SELECT * FROM posts")
    console.log(rows)
    return rows
  }
  module.exports = {addPost, getPost}