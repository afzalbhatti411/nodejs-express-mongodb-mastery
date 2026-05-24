import express from "express";
const app = express();
const port = 3000;

app.get('/', (req, res)=>{
    res.send('its Home Page');
})

app.get('/about', (req, res)=>{
    res.send('its about page');
})

app.listen(port, ()=>{
    console.log(`server is listening from the port : ${port}`)
})