import express from 'express';
import data from './Data.js'


const app = express()

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/products', function (req, res) {
    res.send(data)
})

const port = process.env.PORT || 8000
  
app.listen(8000, (req,res)=>{
    console.log("8000 port run")
})