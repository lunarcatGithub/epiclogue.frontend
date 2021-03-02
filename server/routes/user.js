var express = require('express');
var router = express.Router();

const contents = [
    {
        banner:{
        origin: "https://lunarcatuserdata.s3.ap-northeast-2.amazonaws.com/20210224110924_c8317ac88e249644c06722b2e431fdf02c2a8d1d8f2cee9d.jpeg",
        thumbnail: "https://resized-lunarcatuserdata.s3.ap-northeast-2.amazonaws.com/resized-20210224110924_c8317ac88e249644c06722b2e431fdf02c2a8d1d8f2cee9d.jpeg"
    },
        followerCount: 2,
        followingCount: 1,
        intro: null,
        isFollowing: "me",
        joinDate: "2021-02-09T01:10:56.801Z",
        nickname: "ㅋㅋㄹㅃㅃ",
        profile:{
        origin: "https://lunarcatuserdata.s3.ap-northeast-2.amazonaws.com/20210224110939_ccf855eaa6121c0bb3f500c3c53e48fe109e5b46b83099d9.jpeg",
        thumbnail: "https://resized-lunarcatuserdata.s3.ap-northeast-2.amazonaws.com/resized-20210224110939_ccf855eaa6121c0bb3f500c3c53e48fe109e5b46b83099d9.jpeg"
    },
        screenId: "sdassdaadwds",
        _id: 1,
    }
]

// 경로 매개변수를 사용한 라우팅: 특정 유저 정보 제공
router.get('/:id',  (req, res, next) => {
    let user = contents.find(u => u._id === parseInt(req.params.id))

    res.send({result:'ok', data:user});
});

module.exports = router;

