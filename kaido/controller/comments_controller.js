const Comment = require('../models/comment');
const Post = require('../models/post');
const { post } = require('../routes');
module.exports.create = async function(req, res) {
    // Post.findById(req.body.post, function(err, post) { 
    //     if(err) {
    //         console.log('couldnt fidn post');
    //         return;
    //     }
    //     if(post) {
    //         Comment.create({
    //             content: req.body.content,
    //             post: req.body.post,
    //             user: req.user._id
    //         }, function(err, comment) {
    //             if(err) {
    //                 console.log('error creating the post');
    //                 return;
    //             }
    //             post.comments.push(comment);
    //             post.save();
    //             res.redirect('/');
    //         })
    //     }
    // })
    try{
        let post = await Post.findById(req.body.post);
        if(post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            post.comments.push(comment);
            post.save();
            res.redirect('/');
        }
    } catch(err) {
        console.log('error', err);
        return;
    }
}

module.exports.destroy = async function(req, res) {
    // Comment.findById(req.params.id, function(err, comment) {
    //     if(err){
    //         console.log('error finding');
    //         return;
    //     }
    //     if(comment.user = req.user.id) {
    //         let postId = comment.post;
    //         comment.remove();
    //         Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post) {
    //             return res.redirect('back');
    //         })
    //     } else {
    //         return res.redirect('back');
    //     }
    // })
    try {
        let comment = await Comment.findById(req.params.id);
        if(comment.user = req.user.id) {
            let postId = comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}})
            return res.redirect('back')
        } else {
            return res.redirect('back');
        }
    } catch(err) {
        console.log("error", err);
        return;
    }
}