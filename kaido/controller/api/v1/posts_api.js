const Post = require("../../../models/post")
const Comment = require('../../../models/comment')
module.exports.index = async function(req, res) {
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate:  {
            path: 'user'
        }
    });
     
    return res.json(200, {
        message: "List of posts",
        posts: posts
    })
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
        // if(post.user == req.user.id) { 
            post.remove();
            await Comment.deleteMany({post: req.params.id});

            return res.json(200, {
                message: "Post and assoicated comments deleted"
            })
            // req.flash('success', 'Post Deleted Successfully')
            // return res.redirect('back')
        // } else {
            // req.flash('error', 'Error in Deleting the Post')
            // return res.redirect('back');
        // }
    } catch(err) {
        // req.flash('error', err)
        return res.json(500,{
            message: 'Internal Server Error'
        });
    }
    
}