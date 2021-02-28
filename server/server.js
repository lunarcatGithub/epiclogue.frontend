const express = require('express');
const bodyParser = require('body-parser');
let contents = require('./contentsList');

const port = 5000;
const app = express();
console.log(contents)
// const test = [
//     {id:1, title:'asd', name:'asd'},
//     {id:2, title:'4124', name:'gsgqe'}
// ]

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', (req, res) => {
    return res.send('aaa')
})

app.use('/board', contents);


app.listen(port, ()=> {
    console.log('서버켜짐 ㅅㄱ')
})