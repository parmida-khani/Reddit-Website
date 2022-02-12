const {createPost,getPosts,getPostById,likePost,unlikePost,addComment,searchPost,getComments} =require("../controllers/post");
const {check} = require("express-validator");
const express = require("express");
const router = express.Router();



router.post('/createPost', [
    check("title", "title can not be empty").isLength({min: 1}),
    check("text", "text can not be empty").isLength({min: 1}),
] ,createPost);

router.get('/getPosts',getPosts);

router.get('/getPost/:id',getPostById);

router.put('/likePost/:id',likePost);

router.put('/unlikePost/:id',unlikePost);

router.put('/addComment/:id',addComment);

router.get('/search/:searchInput',searchPost);

router.get('/getComments/:id',getComments);

module.exports =router;
