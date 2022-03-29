const Post = require('../models/post');
const Comment = require('../models/comment')
module.exports.create = async function(req, res) { 
    // Post.create({
    //     content: req.body.content,
    //     user: req.user._id
    // }, function(err, post) {
    //     if(err) {
    //         console.log('error in creating the post');
    //         return;
    //     }
    //     return res.redirect('back');
    // })
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post Created!"
            })
        }

        req.flash('success', 'Post Created')
        return res.redirect('back');
    } catch(err) {
        req.flash('error', 'Error creating the post ')
        return res.redirect('back');
    }
    
}

module.exports.destroy = async function(req, res) {
    // Post.findById(req.params.id, function(err, post) {
    //     if(err) {
    //         console.log('cant find post');
    //         return;
    //     }
    //     // .id means converting object id into string
    //     if(post.user == req.user.id) { 
    //         post.remove();
    //         Comment.deleteMany({post: req.params.id}, function(err) {
    //             if(err) {
    //                 console.log('couldnt delete the comments');
    //                 return;
    //             }
    //             return res.redirect('back');
    //         })
    //     } else {
    //         return res.redirect('back');
    //     }
    // })
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id) { 
            post.remove();
            await Comment.deleteMany({post: req.params.id});

            if(req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
            req.flash('success', 'Post Deleted Successfully')
            return res.redirect('back')
        } else {
            req.flash('error', 'Error in Deleting the Post')
            return res.redirect('back');
        }
    } catch(err) {
        req.flash('error', err)
        return;
    }
    
}