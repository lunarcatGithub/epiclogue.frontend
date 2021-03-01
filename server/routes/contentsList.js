var express = require('express');
var router = express.Router();

const contents = [
    {
        boardTitle: "4412323sad",
        bookmarked: false,
        category: "0",
        liked: false,
        pub: 1,
        thumbnail: "https://resized-lunarcatdata.s3.ap-northeast-2.amazonaws.com/resized-20210226144712_4c468b3b16999fd97d9e7ed88f0c615fc3a89b47005569a0.jpeg",
        writer: {
            following: false,
            nickname: "123",
            profile: {
                origin: null,
                thumbnail: null
            },
            origin: null,
            thumbnail: null,
            screenId: "47dbdcf50864bd",
            _id: "602f1e42be83e8004001c8ab",
        },

        _id: "603909f08eca2400a029067b"
    },
    {
        boardTitle: "블루아카이브 omcxxx 작가",
        bookmarked: false,
        category: "0",
        liked: false,
        pub: 1,
        thumbnail: "https://resized-lunarcatdata.s3.ap-northeast-2.amazonaws.com/resized-20210226144712_4c468b3b16999fd97d9e7ed88f0c615fc3a89b47005569a0.jpeg",
        writer: {
            following: false,
            nickname: "만붕",
            profile: {
                origin: null,
                thumbnail: null
            },
            origin: null,
            thumbnail: null,
            screenId: "47dbdcf50864bd",
            _id: "602f1e42be83e8004001c8ab",
        },

        _id: "603909f08eca2400a029067b"
    },
    {
        boardTitle: "asdffq",
        bookmarked: false,
        category: "0",
        liked: false,
        pub: 1,
        thumbnail: "https://resized-lunarcatdata.s3.ap-northeast-2.amazonaws.com/resized-20210226144712_4c468b3b16999fd97d9e7ed88f0c615fc3a89b47005569a0.jpeg",
        writer: {
            following: false,
            nickname: "만붕",
            profile: {
                origin: null,
                thumbnail: null
            },
            origin: null,
            thumbnail: null,
            screenId: "47dbdcf50864bd",
            _id: "602f1e42be83e8004001c8ab",
        },

        _id: "603909f08eca2400a029067b"
    }
]

// 모든 유저 정보를 제공하는 라우팅
router.get('/', function (req, res, next) {
    return res.json(contents);
});

// 경로 매개변수를 사용한 라우팅: 특정 유저 정보 제공
router.get('/board/:id', function (req, res, next) {
    user = contents.find(u => u._id === parseInt(req.params.id))
    res.send(contents);
});

module.exports = router;

