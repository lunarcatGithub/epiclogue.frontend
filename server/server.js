const express = require('express');
const bodyParser = require('body-parser');
const contents = require('./contentsList');
console.log(contents)
const port = 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/board', (req, res) => {
    return res.send(contents)
})

app.listen(port, ()=> {
    console.log('서버켜짐 ㅅㄱ')
})