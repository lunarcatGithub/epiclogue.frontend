const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
let contents = require('./routes/contentsList');
let user = require('./routes/user');

const port = 5000;
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // 허락하고자 하는 요청 주소
    credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', (req, res) => {
    return res.send('main page')
})

app.use('/board', contents);
app.use('/myboard', user);


app.listen(port, ()=> {
    console.log('서버 온!')
})