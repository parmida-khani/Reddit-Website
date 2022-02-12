const Post = require("../models/post");

exports.createPost = (req, res) => {
    const post = new Post({
        title: req.body.title,
        communityName: req.body.communityName,
        publisherUsername: req.body.publisherUsername,
        text: req.body.text,
        image: req.body.image
    })
    const today = new Date();
    post.publishDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    post.save((err, post) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to add post"
            })
        }
        return res.status(201).json({
            message: "Success",
            post
        })
    })
}
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find({}, {
            'title': 1, 'communityName': 1, 'publisherUsername': 1, 'text': 1, 'publishDate': 1, 'numOfLikes': 1,
            'numOfDislikes': 1, 'numOfComments': 1 ,'userLikes' : 1,'image':1, '_id': 1, 'comments': 1
        });

        const sortBy = req.query.sort;
        sortPosts(posts, sortBy);

        res.status(200).json(posts);

    } catch (error) {
        res.send("Error " + error);
    }
}


function sortPosts(c, sortBy) {
    switch (sortBy) {
        case 'publishDate':
            c.reverse();
            break
        case 'numOfLikes':
            c.sort(function (a, b) {
                return -a.numOfLikes + b.numOfLikes;
            });
            break
        case 'numOfComments':
            c.sort(function (a, b) {
                return -a.numOfComments + b.numOfComments;
            });
            break
    }
}

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id, {
            'title': 1, 'communityName': 1, 'publisherUsername': 1, 'text': 1, 'publishDate': 1, 'numOfLikes': 1,
            'numOfDislikes': 1, 'numOfComments': 1, '_id': 1, 'userLikes': 1, 'comments': 1
        });
        res.status(200).json(post);
    } catch (error) {
        res.send("Error " + error);
    }
}

exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.userLikes.includes(req.body.username)) {
            post.userLikes.push(req.body.username);
            post.numOfLikes++;
        }
        const p = await post.save()
        res.status(200).json("success");
    } catch (error) {
        res.send("Error " + error);
    }
}

exports.unlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userLikes.includes(req.body.username)) {
            const index = post.userLikes.indexOf(req.body.username);
            post.userLikes.splice(index, 1);
            post.numOfLikes--;
        }
        console.log(post.userLikes);

        const p = await post.save()
        res.status(200).json("success");
    } catch (error) {
        res.send("Error " + error);
    }
}
exports.addComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        post.comments.push({
            text:req.body.text,
            username: req.body.username
        });
        post.numOfComments++;

        const p = await post.save()
        res.status(201).json(p);
    } catch (error) {
        res.send("Error " + error);
    }
}

exports.searchPost = async (req, res) => {
    try {
        const posts = await Post.find({}, {
            'title': 1, 'communityName': 1, 'publisherUsername': 1, 'text': 1, 'publishDate': 1, 'numOfLikes': 1,
            'numOfDislikes': 1, 'numOfComments': 1, '_id': 1, 'comments': 1
        });
        const searchPosts = posts.filter(post => post.text.includes(req.params.searchInput));
        res.status(200).json(searchPosts);
    } catch (error) {
        res.send("Error " + error);
    }
}

exports.getComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id,{comments:1,_id:0});
        res.status(200).json(post);
    } catch (error) {
        res.send("Error " + error);
    }
}
